import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'searchbox-planes',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.css'],
})
export class SearchboxComponent {
  @Output() buscarPlanNombre: EventEmitter<string> = new EventEmitter<string>();
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
    this.buscarPlanNombre.emit(this.searchTerm.trim());
  }
}
