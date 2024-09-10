import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from './edit-element-dialog.component';

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
  dataSource: PeriodicElement[] = [...ELEMENT_DATA]; // Kopia danych
  isLoading: boolean = true; // Zmienna do kontrolowania stanu ładowania

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchElements();
  }

  async fetchElements(): Promise<void> {
    // Symulacja pobierania danych z opóźnieniem przy użyciu fetch i setTimeout
    await new Promise((resolve) => setTimeout(resolve, 2000)); // symulacja opóźnienia
    this.isLoading = false; // Po załadowaniu danych ustawiamy isLoading na false
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '250px',
      data: { ...element }, // Przekazujemy kopię, aby nie mutować danych
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Nowa tablica, aktualizując zmieniony element
        this.dataSource = this.dataSource.map((el) =>
          el.position === result.position ? result : el
        );
      }
    });
  }
}
