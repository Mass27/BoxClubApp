import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FacService } from '../../services/fac.service';
import { Factura } from '../../interfaces/Factura.interfaces';
import { Planes } from 'src/app/planes/interfaces/planes.interface';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';
import { Productos } from 'src/app/productos/interfaces/productos.interfaces';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Clientes } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { FacturaID } from '../../interfaces/facPorID.interfaces';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CorreoComponent } from '../../components/correo/correo.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit,AfterViewInit {
  facturas: Factura[] = [];
  tipPlanes: Planes[] = [];
  tipProducto: Productos[] = [];
  cliente: Clientes[] = [];
  facturasFiltradas: MatTableDataSource<Factura> = new MatTableDataSource<Factura>([]); // Cambiar a MatTableDataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalIngresos: number = 0;
  //facturasFiltradas: Factura[] = [];
  isAdmin: boolean = false;
  fechaInicio: string = '';
  fechaFin: string = '';
  columnas: string[] = [
    'nombreCliente',
    'numeroFactura',
    'fecha',
    'metodoPago',
    'plan',
    'productos',
    'cantidadProductos',
    'subTotal',
    'descuentos',
    'total',
    'acciones',
    'send',
  ];
  constructor(
    private facturaService: FacService,
    private usuarioService: usuarioService,
    private prodService: ProductosService,
     private snackBar: MatSnackBar,
     private dialog: MatDialog,

  ) {}


  ngOnInit(): void {
    this.facturaService.getAllFacturas().subscribe((facturas) => {
      this.facturas = facturas;
      this.facturasFiltradas = new MatTableDataSource(facturas);
      this.facturasFiltradas.paginator = this.paginator;
      this.obtenerFiltrosAlmacenados();
    if (this.fechaInicio && this.fechaFin) {
      this.aplicarFiltros();
    } else {
      this.calcularTotalIngresos();
    }
    });
    this.usuarioService
      .getAllplanes()
      .subscribe((planes) => (this.tipPlanes = planes));
    this.prodService
      .getAllProductos()
      .subscribe((prod) => (this.tipProducto = prod));
    this.usuarioService
      .getAllUser()
      .subscribe((clien) => (this.cliente = clien));
    this.adminUser();

  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.facturasFiltradas.paginator = this.paginator;
    }
  }
  getPlanName(planId: string): string {
    const plan = this.tipPlanes.find((p) => p._id === planId);
    return plan ? plan.nombrePlan : '';
  }
  getProdName(prodId: string): string {
    const prod = this.tipProducto.find((p) => p._id === prodId);
    return prod ? prod.nombreProducto : '';
  }

  getclientesName(clienteId: string): string {
    const cliente = this.cliente.find((p) => p._id === clienteId);
    return cliente ? cliente.nombreCompleto : '';
  }

  formatDate(date: string): string {

    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  }

  buscarFacturasPorNombre(nombre: string): void {
    if (nombre.trim() === '') {
      this.facturasFiltradas.data = this.facturas;
      return;
    }
    this.facturaService.buscarPorNombre(nombre).subscribe(
      (facturas: FacturaID[]) => {
        this.facturasFiltradas.data = facturas;
      },
      (error) => {
        console.error('Error al buscar facturas por nombre:', error);
      }
    );
  }

  exportToExcel(): void {
    const data: any[] = [];
    let totalIngresos: number = 0;


    this.facturasFiltradas.data.forEach(factura => {
      const row = {
        'Nombre de Cliente': this.getclientesName(factura.idcliente),
        'No. De Factura': factura.numeroFactura,
        'Fecha': factura.fecha,
        'Método de Pago': factura.metodoPago,
        'Plan': this.getPlanName(factura.idPlan),
        'Productos': this.getProdName(factura.idproducto!),
        'Cantidad de Productos': factura.CantidadProducto,
        'SubTotal': `Lps.${factura.subtotal}`,
        'Descuentos': `${factura.descuento}%`,
        'Total': `Lps.${factura.totalPagar}`,
      };
      data.push(row);
      totalIngresos += factura.totalPagar;
    });


    const totalRow = {
      'Nombre de Cliente': '',
      'No. De Factura': '',
      'Fecha': '',
      'Método de Pago': '',
      'Plan': '',
      'Productos': '',
      'Cantidad de Productos': '',
      'SubTotal': '',
      'Descuentos': '',
      'Total': `Total de Ingresos: Lps.${totalIngresos}`,
    };
    data.push(totalRow);


    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);


    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Facturas');


    XLSX.writeFile(wb, `Reporte de Facturas de Mes_${this.fechaInicio}__${this.fechaFin}.xlsx`);
  }


  obtenerFiltrosAlmacenados(): void {
    const filtros = JSON.parse(localStorage.getItem('filtros') || '{}');
    this.fechaInicio = filtros.fechaInicio || '';
    this.fechaFin = filtros.fechaFin || '';
  }

  guardarFiltros(): void {
    const filtros = { fechaInicio: this.fechaInicio, fechaFin: this.fechaFin };
    localStorage.setItem('filtros', JSON.stringify(filtros));
  }

  aplicarFiltros(): void {
    const facturasFiltradas = this.facturas
      .filter((factura) => {
        const fechaFactura = new Date(factura.fecha);
        const fechaInicio = new Date(this.fechaInicio);
        const fechaFin = new Date(this.fechaFin);
        return fechaFactura >= fechaInicio && fechaFactura <= fechaFin;
      })
      .sort((a, b) => {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
        return fechaA.getTime() - fechaB.getTime();
      });
    this.facturasFiltradas.data = facturasFiltradas; // Actualizar los datos filtrados
    this.calcularTotalIngresos();
  }
  calcularTotalIngresos(): void {
    this.totalIngresos = this.facturasFiltradas.filteredData.reduce((total, factura) => total + factura.totalPagar, 0);
  }

  buscarFacturasPorFechas(): void {
    this.aplicarFiltros();
    this.guardarFiltros(); // Guardar los filtros después de aplicarlos
  }

  limpiarFiltros(): void {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.facturasFiltradas.data = this.facturas; // Asignar los datos directamente a .data
    this.guardarFiltros(); // Guardar los filtros después de limpiarlos
    this.calcularTotalIngresos();
  }

  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'ADMINISTRADOR') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

enviarFacturaPorCorreo(idFactura: string) {
  const dialogRef = this.dialog.open(CorreoComponent, {
    width: '400px'
  });

  dialogRef.afterClosed().subscribe(email => {
    if (email) {
      this.facturaService.enviarFactura(idFactura, email).subscribe({
        next: () => this.snackBar.open('Factura enviada correctamente', 'Cerrar', { duration: 3000 }),
        error: () => this.snackBar.open('Error al enviar factura', 'Cerrar', { duration: 3000 })
      });
    }
  });
}


}
