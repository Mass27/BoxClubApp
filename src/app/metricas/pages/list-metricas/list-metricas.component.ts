import { Component, OnInit } from '@angular/core';
import { MetricasService } from '../../services/metricas.service';
import { Metricas } from '../../interfaces/metricas.interfaces';

@Component({
  selector: 'app-list-metricas',
  templateUrl: './list-metricas.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class ListMetricasComponent implements OnInit{
  Metricas: Metricas[] = [];
  MetricasFiltradas: Metricas[] = [];
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
   constructor( private metricasService:MetricasService) {}
  isAdmin: boolean = false;
  ngOnInit(): void {
    this.adminUser();
 ;
    this.getMetricas();
  }

 searchByName(name: string): void {
  console.log(name);
  }

getMetricas() {
this.metricasService.listar().subscribe((metricas) => {
  this.Metricas = metricas;
  this.MetricasFiltradas = [...this.Metricas];});

}
  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'ADMINISTRADOR') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
