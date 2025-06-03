import { Component, OnInit } from '@angular/core';
import { Productos } from '../../interfaces/productos.interfaces';
import { ProductosService } from '../../services/productos.service';
import { ProdByID } from '../../interfaces/prodById.interfaces';
import { Metricas } from '../../interfaces/metrics.interfaces';

@Component({
  selector: 'app-list-pro',
  templateUrl: './list-pro.component.html',
  styleUrls: ['./list-pro.component.css'],
})
export class ListProComponent implements OnInit {
  productos: Productos[] = [];
  prodFiltrados: Productos[] = [];
  isAdmin = false;
   totalProductos = 0;
  activosCount = 0;
  sinStockCount = 0;
  ventasHoy = 0;
  constructor(private productosService: ProductosService) {}
  ngOnInit(): void {
    this.getAllProductos();
    this.adminUser();
      this.getMetrics();
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
   getMetrics() {
    this.productosService.obtenerMetrics().subscribe({
      next: (res: Metricas) => {
        this.totalProductos = res.totalProductos;
        this.activosCount = res.activosCount;
        this.sinStockCount = res.sinStockCount;
        this.ventasHoy = res.ventasHoy;
      },
      error: (err) => {
        console.error('Error al obtener métricas:', err);
      },
    });
  }
}
