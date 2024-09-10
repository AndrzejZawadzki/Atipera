import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Potrzebne dla Angular Material
    MatTableModule, // Dodanie tabeli z Angular Material
    MatProgressSpinnerModule, // Dodanie spinnera z Angular Material
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
