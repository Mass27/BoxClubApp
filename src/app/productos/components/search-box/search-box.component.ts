import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Output() buscarProductoNombre: EventEmitter<string> =
    new EventEmitter<string>();
  searchTerm: string = '';
  private searchTerms = new Subject<string>();
  constructor() {
    this.searchTerms.pipe(debounceTime(300)).subscribe(() => {
      this.realizarBusqueda();
    });
  }

  buscar(): void {
    this.searchTerms.next(this.searchTerm); // Dispara el evento para iniciar la búsqueda
  }
  realizarBusqueda(): void {
    this.buscarProductoNombre.emit(this.searchTerm.trim());
  }
}
