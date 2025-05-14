import { Component, OnInit } from '@angular/core';
import { MetricasService } from '../../services/metricas.service';
import { Metricas } from '../../interfaces/metricas.interfaces';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';
import { Clientes } from 'src/app/usuarios/interfaces/usuario.interfaces';

@Component({
  selector: 'app-list-metricas',
  templateUrl: './list-metricas.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
})
export class ListMetricasComponent implements OnInit{
  Metricas: Metricas[] = [];
  MetricasFiltradas: Metricas[] = [];
  User:Clientes[] = [];
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
   constructor( private metricasService:MetricasService,
    private usuariosService:usuarioService
   ) {}
  isAdmin: boolean = false;
  isEntrenador: boolean = false;
  ngOnInit(): void {
    this.adminUser();
    this.usuariosService.getAllUser().subscribe((usuarios) => {
      this.User = usuarios;
    });
    this.getMetricas();
  }

 searchByName(name: string): void {
  this.MetricasFiltradas = this.Metricas.filter(metrica =>
    this.getUuserName(metrica.clienteId).toLowerCase().includes(name.toLowerCase())
  );
  }

getMetricas() {
this.metricasService.listar().subscribe((metricas) => {
  this.Metricas = metricas;
  this.MetricasFiltradas = [...this.Metricas];});

}
   adminUser() {
  const tipoUsuario = sessionStorage.getItem('tipoUsuario');
  this.isAdmin = tipoUsuario === 'ADMINISTRADOR';
  this.isEntrenador = tipoUsuario === 'entrenadores'; // o 'ENTRENADOR' si lo guardas en mayúsculas
}



  getUuserName(nombre: string): string {

    const user = this.User.find((user) => user._id === nombre);
    return user ? user.nombreCompleto : nombre;
  }
}
