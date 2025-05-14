import { Component, OnInit } from '@angular/core';
import { RutinasService } from '../../services/rutinas.service';
import { Rutinas } from '../../interfaces/rutinas.interfaces';
import { EmpleadosService } from 'src/app/Empleados/services/empleados.service';
import { Empleados2 } from 'src/app/Empleados/interfaces/empleados2.interfaces';
import { RutinasID } from '../../interfaces/rutinasId.interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  rutinas: Rutinas[] = [];
  rutinasFiltrado: Rutinas[] = [];
  isAdmin: boolean = false;
    empleados:Empleados2[] = [];
    isEntrenador: boolean = false;
  constructor(private rutinasService: RutinasService,
        private empleadoService: EmpleadosService
  ) {}

  ngOnInit() {
    this.getRutinas();
    this.adminUser();

    this.empleadoService.getAllEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });

  }

  getRutinas() {
    this.rutinasService.getAllRutinas().subscribe((rutinas) => {
      this.rutinas = rutinas;
      this.rutinasFiltrado = [...this.rutinas];
    });
  }
  adminUser() {
  const tipoUsuario = sessionStorage.getItem('tipoUsuario');
  this.isAdmin = tipoUsuario === 'ADMINISTRADOR';
  this.isEntrenador = tipoUsuario === 'entrenadores'; // o 'ENTRENADOR' si lo guardas en mayúsculas
}

  searchByName(name: string): void {
    if (name.trim() === '') {
      this.rutinasFiltrado = this.rutinas; // Restaurar la lista completa
      return;
    }

    this.rutinasService.searchByName(name).subscribe(
      (rutinas: Rutinas[]) => {
        // Actualiza las rutinas filtradas con los resultados de la búsqueda
        this.rutinasFiltrado = rutinas;
      },
      (error) => {
        console.error('Error al buscar rutinas por nombre:', error);
      }
    );
  }

    getempleadoName(empleadoId:string): string {
const empleado = this.empleados.find((empleado) => empleado._id === empleadoId);
return empleado ? empleado.nombreCompleto : 'Empleado no encontrado';
    }
}
