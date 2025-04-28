import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Empleados2 } from '../../interfaces/empleados2.interfaces';
import { EmpleadoByID } from '../../interfaces/EmpleadoById.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  empleados: Empleados2[] = [];
  isAdmin: boolean = false;
  empleadosFiltradas: Empleados2[] = [];

  constructor(
    private empleadoService: EmpleadosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.obEmpleados();
    this.adminUser();
  }

  obEmpleados() {
    this.empleadoService.getAllEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
      this.empleadosFiltradas = [...this.empleados];
    });
  }

  buscarEmpleadoPorNombre(nombre: string): void {
    if (nombre.trim() === '') {
      this.empleadosFiltradas = this.empleados; // Restaurar la lista completa
      return;
    }

    this.empleadoService.buscarEmpleadosPorNombre(nombre).subscribe(
      (empleado: EmpleadoByID[]) => {
        // Actualiza las facturas filtradas con los resultados de la búsqueda
        this.empleadosFiltradas = empleado;
        console.log(this.empleadosFiltradas);
      },
      (error) => {
        console.error('Error al buscar facturas por nombre:', error);
      }
    );
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
