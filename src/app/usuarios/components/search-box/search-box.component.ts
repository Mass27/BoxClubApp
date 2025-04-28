import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {
  @Output() bcNombre: EventEmitter<string> = new EventEmitter<string>();
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
    this.bcNombre.emit(this.searchTerm.trim());
  }
}
