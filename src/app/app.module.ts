import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditElementDialogComponent } from './edit-element-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    EditElementDialogComponent, // Dodanie komponentu dialogu
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Potrzebne dla Angular Material
    MatTableModule, // Dodanie tabeli z Angular Material
    MatProgressSpinnerModule, // Dodanie spinnera z Angular Material
    MatDialogModule, // Dodanie modułu dialogu
    MatButtonModule, // Dodatnie przycisków
    MatInputModule, // Dodanie modułu inputa
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
