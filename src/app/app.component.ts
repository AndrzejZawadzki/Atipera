import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditElementDialogComponent } from './edit-element-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DataService } from './data.service';
import { PeriodicElement } from './data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private destroyRef = inject(DestroyRef);

  constructor(public dialog: MatDialog, private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchElements();
    this.filterControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.applyFilter(value ?? '');
      });
  }

  fetchElements(): void {
    this.isLoading = true;
    if (!this.dataSource.data.length) {
      this.dataService
        .getData()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((data) => {
          this.dataSource.data = data;
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  }

  applyFilter(filterValue: string): void {
    this.dataService
      .filterData(filterValue)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filteredData) => {
        this.dataSource.data = filteredData;
      });
  }

  openEditDialog(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(EditElementDialogComponent, {
      width: '250px',
      data: { ...element },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.dataSource.data = this.dataSource.data.map((el) =>
            el.position === result.position ? result : el
          );
        }
      });
  }
}
