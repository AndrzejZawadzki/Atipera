import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from './edit-element-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];
  //dataSource: PeriodicElement[] = []; // Dane pochodzące z fetch
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>([]);
  filterControl = new FormControl(''); // Kontrolka filtra
  isLoading = true; // Flaga do spinnera

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchElements();

    // Nasłuchiwanie na zmiany w filtrze z opóźnieniem 2 sekundy
    this.filterControl.valueChanges
      .pipe(debounceTime(2000)) // DebounceTime na 2 sekundy
      .subscribe((value) => {
        this.applyFilter(value);
      });
  }

  async fetchElements(): Promise<void> {
    this.isLoading = true;
    // Symulacja pobierania danych z opóźnieniem przy użyciu fetch i setTimeout
    await new Promise((resolve) => setTimeout(resolve, 2000)); // symulacja opóźnienia
    this.dataSource.data = [...ELEMENT_DATA]; // Skopiowane dane
    this.isLoading = false; // Po załadowaniu danych ustawiamy isLoading na false
  }

  // Filtrowanie danych
  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '250px',
      data: { ...element }, // Przekazujemy kopię, aby nie mutować danych
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Nowa tablica, aktualizując zmieniony element
        this.dataSource.data = this.dataSource.data.map((el) =>
          el.position === result.position ? result : el
        );
        // this.dataSource.data = this.dataSource; // Aktualizacja danych w tabeli
        this.applyFilter(this.filterControl.value); // Odświeżenie filtra
      }
    });
  }
}
