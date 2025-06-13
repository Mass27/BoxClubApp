import { Component, OnInit, ViewChild } from '@angular/core';
import { RutinasService } from '../../services/rutinas.service';
import { Rutinas } from '../../interfaces/rutinas.interfaces';
import { EmpleadosService } from 'src/app/Empleados/services/empleados.service';
import { Empleados2 } from 'src/app/Empleados/interfaces/empleados2.interfaces';
import { RutinasID } from '../../interfaces/rutinasId.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  rutinas: Rutinas[] = [];
  rutinasFiltrado: Rutinas[] = [];
  isAdmin: boolean = false;
  empleados: Empleados2[] = [];
  isEntrenador: boolean = false;
  constructor(
    private rutinasService: RutinasService,
    private empleadoService: EmpleadosService
  ) {}
  displayedColumns: string[] = ['nombre', 'descripcion', 'empleado', 'acciones'];
  dataSource: MatTableDataSource<Rutinas> = new MatTableDataSource<Rutinas>();
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
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
      this.rutinasFiltrado = [...rutinas];
      this.dataSource = new MatTableDataSource(rutinas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    this.isAdmin = tipoUsuario === 'ADMINISTRADOR';
    this.isEntrenador = tipoUsuario === 'entrenadores'; // o 'ENTRENADOR' si lo guardas en mayúsculas
  }

 searchByName(name: string): void {
    if (name.trim() === '') {
      this.dataSource.data = this.rutinas;
      return;
    }

    this.rutinasService.searchByName(name).subscribe(
      (rutinas: Rutinas[]) => {
        this.dataSource.data = rutinas;
      },
      (error) => {
        console.error('Error al buscar rutinas por nombre:', error);
      }
    );
  }

  getempleadoName(empleadoId: string): string {
    const empleado = this.empleados.find(
      (empleado) => empleado._id === empleadoId
    );
    return empleado ? empleado.nombreCompleto : 'Empleado no encontrado';
  }

 downloadPDF(id: string) {
  this.rutinasService.downloadPDF(id).subscribe(
    (response) => {
      const blob = new Blob([response], { type: 'application/pdf' });


      if (blob.size === 0) {
        console.error('El archivo PDF está vacío.');
        return;
      }

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `rutina-${id}.pdf`;
      link.click();

     
      URL.revokeObjectURL(link.href);
    },
    (error) => {
      console.error('Error al descargar el PDF', error);
    }
  );
}

}
