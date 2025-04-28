import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
})
export class SearchboxComponent {
  @Output() buscarEmpleadoNombre: EventEmitter<string> =
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
    this.buscarEmpleadoNombre.emit(this.searchTerm.trim());
  }
}
