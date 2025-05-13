import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacService } from '../../services/fac.service';
import { Factura } from '../../interfaces/Factura.interfaces';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';
import { ProductosService } from 'src/app/productos/services/productos.service';
import { Productos } from 'src/app/productos/interfaces/productos.interfaces';
import { Planes } from 'src/app/planes/interfaces/planes.interface';

@Component({
  selector: 'app-facturacionprint',
  templateUrl: './facturacionprint.component.html',
  styleUrls: ['./facturacionprint.component.css']
})
export class FacturacionprintComponent implements OnInit {

  factura!: Factura;
  loading = true;
  tipPlanes: Planes[] = [];
  tipProducto: Productos[] = [];
  constructor(
    private route: ActivatedRoute,
    private facturacionService: FacService,
     private userService: usuarioService,
        private prodService: ProductosService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const facturaId = params['id'];
      if (facturaId) {
        this.facturacionService.getFacturaById(facturaId).subscribe({
          next: (data) => {
            this.factura = data;
            this.loading = false;
            setTimeout(() => window.print(), 500);
          },
          error: (err) => {
            console.error('Error al obtener la factura:', err);
            this.loading = false;
          },
        });
      }
    });
    this.userService
    .getAllplanes()
    .subscribe((planes) => (this.tipPlanes = planes));
    this.prodService
    .getAllProductos()
    .subscribe((prod) => (this.tipProducto = prod));
    }

    getPlanName(planId: string): string {
      const plan = this.tipPlanes.find((p) => p._id === planId);
      console.log('🔍 Buscando nombre del plan:', planId, '➡️', plan?.nombrePlan || 'No encontrado');
      return plan ? plan.nombrePlan : '';
    }
    getProdName(prodId: string): string {
      const prod = this.tipProducto.find((p) => p._id === prodId);
      return prod ? prod.nombreProducto : '';
    }

    
  }

