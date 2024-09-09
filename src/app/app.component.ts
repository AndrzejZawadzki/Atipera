import { Component, OnInit } from '@angular/core';
import { ElementService, PeriodicElement } from './element.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = [];

  constructor(private elementService: ElementService) {}

  ngOnInit(): void {
    // Pobieranie danych przy starcie aplikacji
    this.elementService.getElements().subscribe((data) => {
      this.dataSource = data;
    });
  }
}
