import { Component, OnInit } from '@angular/core';
import { Productos } from '../../interfaces/productos.interfaces';
import { ProductosService } from '../../services/productos.service';
import { ProdByID } from '../../interfaces/prodById.interfaces';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css'],
})
export class ListProComponent implements OnInit {
  productos: Productos[] = [];
  prodFiltrados: Productos[] = [];
  isAdmin = false;
  constructor(private productosService: ProductosService) {}
  ngOnInit(): void {
    this.getAllProductos();
    this.adminUser();
  }

  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'ADMINISTRADOR') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  getAllProductos() {
    this.productosService.getAllProductos().subscribe((pro) => {
      this.productos = pro;
      this.prodFiltrados = [...this.productos];
    });
  }
  buscarProductoPorNombre(nombre: string): void {
    if (nombre.trim() === '') {
      this.prodFiltrados = this.productos; // Restaurar la lista completa
      return;
    }

    this.productosService.buscarPorNombre(nombre).subscribe(
      (prod: ProdByID[]) => {
        // Actualiza las facturas filtradas con los resultados de la búsqueda
        this.prodFiltrados = prod;
      },
      (error) => {
        console.error('Error al buscar facturas por nombre:', error);
      }
    );
  }
}
