import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'search-box-fac',
  templateUrl: './search-box.component.html',
  // styleUrls: ['./search-box.component.css'],
})
export class SearchBoxComponent {
  @Output() buscarNombre: EventEmitter<string> = new EventEmitter<string>();
  searchTerm: string = '';
  private searchTerms = new Subject<string>();

  constructor() {
    // Espera 300 milisegundos después de que el usuario deja de escribir
    this.searchTerms.pipe(debounceTime(300)).subscribe(() => {
      this.realizarBusqueda();
    });
  }

  buscar(): void {
    this.searchTerms.next(this.searchTerm); // Dispara el evento para iniciar la búsqueda
  }

  realizarBusqueda(): void {
    this.buscarNombre.emit(this.searchTerm.trim());
  }
}
