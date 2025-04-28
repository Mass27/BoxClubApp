import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../services/planes.service';
import { Planes } from '../../interfaces/planes.interface';
import { PlanesByID } from '../../interfaces/planesById.interfaces';

@Component({
  selector: 'app-list-pl',
  templateUrl: './list-pl.component.html',
  styleUrls: ['./list-pl.component.css'],
})
export class ListPlComponent implements OnInit {
  planes: Planes[] = [];
  planesFiltrado: Planes[] = [];
  isAdmin: boolean = false;
  constructor(private planesServices: PlanesService) {}
  ngOnInit(): void {
    this.getPlanes();
    this.adminUser();
  }

  getPlanes() {
    this.planesServices.getAllplanes().subscribe((planes) => {
      this.planes = planes;
      this.planesFiltrado = [...this.planes];
    });
  }
  buscarPlanesPorNombre(nombre: string): void {
    if (nombre.trim() === '') {
      this.planesFiltrado = this.planes; // Restaurar la lista completa
      return;
    }

    this.planesServices.getPlanesBuscarNombre(nombre).subscribe(
      (planes: PlanesByID[]) => {
        // Actualiza las facturas filtradas con los resultados de la búsqueda
        this.planesFiltrado = planes;
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
