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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent, EditElementDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
