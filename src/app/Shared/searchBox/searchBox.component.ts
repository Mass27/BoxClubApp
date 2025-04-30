import { Component, EventEmitter, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
@Component({
  selector: 'app-searchBox',
  templateUrl: './searchBox.component.html',
  styleUrls: ['./searchBox.component.css']
})
export class SearchBoxComponent  {

  @Output() BuscarObject: EventEmitter<string> = new EventEmitter<string>();
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
    this.BuscarObject.emit(this.searchTerm.trim());
  }
}
