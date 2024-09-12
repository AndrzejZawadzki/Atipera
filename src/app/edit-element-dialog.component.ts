import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from './data.service';

@Component({
  selector: 'app-edit-element-dialog',
  templateUrl: './edit-element-dialog.component.html',
})
export class EditElementDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeriodicElement
  ) {}

  onNoClick(): void {
    this.dialogRef.close(); // Zamykamy pop-up
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data); // Zwracamy zmodyfikowane dane
  }
}
