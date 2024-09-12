import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from './edit-element-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DataService } from './data.service';
import { PeriodicElement } from './data.service';

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
  dataSource: MatTableDataSource<PeriodicElement> =
    new MatTableDataSource<PeriodicElement>([]);
  filterControl = new FormControl('');
  isLoading = true;

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchElements();
    this.filterControl.valueChanges.subscribe((value) => {
      this.applyFilter(value ?? '');
    });
  }

  fetchElements(): void {
    this.isLoading = true;
    this.dataService.getData().subscribe((data) => {
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataService.filterData(filterValue).subscribe((filteredData) => {
      this.dataSource.data = filteredData;
    });
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.map((el) =>
          el.position === result.position ? result : el
        );
        this.applyFilter(this.filterControl.value ?? '');
      }
    });
  }
}
