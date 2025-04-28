import { ProductosService } from './../../../productos/services/productos.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FacService } from '../../services/fac.service';
import { usuarioService } from 'src/app/usuarios/services/usuarios.service';
import { Planes } from 'src/app/planes/interfaces/planes.interface';
import { Clientes } from 'src/app/usuarios/interfaces/usuario.interfaces';
import { Productos } from 'src/app/productos/interfaces/productos.interfaces';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agregar-fac',
  templateUrl: './agregar-fac.component.html',
  styleUrls: ['./agregar-fac.component.css'],
})
export class AgregarFacComponent implements OnInit {
  public formulario: FormGroup;
  tipoPlanes: Planes[] = [];
  clientes: Clientes[] = [];
  productos: Productos[] = [];
  public isUpdating: boolean = false;
  public modoVisualizacion: boolean = false;
  public isPrintMode: boolean = false; // Bandera para controlar el modo de impresión
  public selectedFile: File | null = null;
  imprimirMode: boolean = false;

  public isEditMode: boolean = false;
  public facturaId: number | undefined;

  public metodosDePagos = [
    { id: 'Tarjeta', desc: 'Tarjeta' },
    { id: 'Efectivo', desc: 'Efectivo' },
    { id: 'Transferencia', desc: 'Transferencia' },
  ];

  public descuentos = [
    { id: '0', desc: '0%' },
    { id: '5', desc: '5%' },
    { id: '10', desc: '10%' },
    { id: '15', desc: '15%' },
    { id: '20', desc: '20%' },
    { id: '25', desc: '25%' },
    { id: '30', desc: '30%' },
    { id: '35', desc: '35%' },
    { id: '40', desc: '40%' },
    { id: '45', desc: '45%' },
    { id: '50', desc: '50%' },
    { id: '55', desc: '55%' },
    { id: '60', desc: '60%' },
    { id: '65', desc: '65%' },
    { id: '70', desc: '70%' },
    { id: '75', desc: '75%' },
    { id: '80', desc: '80%' },
    { id: '85', desc: '85%' },
    { id: '90', desc: '90%' },
    { id: '95', desc: '95%' },
    { id: '100', desc: '100%' },
  ];
  constructor(
    private facturacionService: FacService,
    private userService: usuarioService,
    private prodService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.url.subscribe((url) => {
      this.imprimirMode = url[0].path === 'imprimir';
    });
    this.formulario = new FormGroup({
      idcliente: new FormControl('', Validators.required),
      nombreCliente: new FormControl(''),
      metodoPago: new FormControl('', Validators.required),
      subtotal: new FormControl('', Validators.required),
      descuento: new FormControl(null),
      totalPagar: new FormControl('', Validators.required),
      fecha: new FormControl(null, Validators.required),
      idPlan: new FormControl(null),
      precioPlan: new FormControl(null),
      idproducto: new FormControl(null),
      precioProducto: new FormControl(null),
      CantidadProducto: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.facturaId = id;
        this.facturacionService.getFacturaById(id).subscribe((factura) => {
          this.formulario.patchValue({
            cantidadProducto: factura.CantidadProducto,
            nombreCliente: factura.nombreCliente,
            idcliente: factura.idcliente,
            metodoPago: factura.metodoPago,
            fecha: this.formatDate(factura.fecha),
            subtotal: factura.subtotal,
            totalPagar: factura.totalPagar,
            descuento: factura.descuento,
            idPlan: factura.idPlan,
            precioPlan: factura.precioPlan,
            idproducto: factura.idproducto,
            precioProducto: factura.precioProducto,
          });
          this.formulario
            .get('CantidadProducto')
            ?.setValue(factura.CantidadProducto);
          if (this.isPrintMode) {
            this.formulario.disable(); // Deshabilitar el formulario en modo de impresión
          }
          this.modoVisualizacion = true;
        });
      }
    });
    this.getClientes();
    this.obtenerPlanes();
    this.getProdcutos();
    this.checkPrintMode();
    this.getClientesActivos();
  }

  formatDate(date: string): string {
    // Obtener solo la parte de la fecha (sin la hora, minutos, segundos ni la zona horaria)
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  }

  getClientesActivos() {
    this.userService.getAllUser().subscribe((clientes) => {
      // Filtrar solo los clientes activos
      this.clientes = clientes.filter((cliente) => cliente.estado === 'Activo');
    });
  }

  obtenerPlanes() {
    this.userService.getAllplanes().subscribe((planes) => {
      this.tipoPlanes = planes;
    });
  }

  getClientes() {
    this.userService.getAllUser().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }
  getProdcutos() {
    this.prodService.getAllProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  actualizarPrecioPlan(event: Event) {
    const idPlanSeleccionado = (event.target as HTMLSelectElement).value;
    const planSeleccionado = this.tipoPlanes.find(
      (plan) => plan._id === idPlanSeleccionado
    );
    if (planSeleccionado) {
      this.formulario.get('precioPlan')?.setValue(planSeleccionado.precio);
    } else {
      this.formulario.get('precioPlan')?.setValue('');
    }
  }
  actualizarPrecioProducto(event: Event) {
    const idProductoSeleccionado = (event.target as HTMLSelectElement).value;
    const productoSeleccionado = this.productos.find(
      (producto) => producto._id === idProductoSeleccionado
    );
    if (productoSeleccionado) {
      this.formulario
        .get('precioProducto')
        ?.setValue(productoSeleccionado.precio);
      // Actualizar el stock en el formulario
      this.formulario.get('CantidadProducto')?.setValue(1);
      this.formulario
        .get('CantidadProducto')
        ?.setValidators([Validators.max(productoSeleccionado.cantidadEnStock)]);
      this.formulario.get('CantidadProducto')?.updateValueAndValidity();
    } else {
      this.formulario.get('precioProducto')?.setValue('');
    }
  }

  actualizarClietne(event: Event) {
    const idCliente = (event.target as HTMLSelectElement).value;
    const clienteSeleccionado = this.clientes.find(
      (cliente) => cliente._id === idCliente
    );
    if (clienteSeleccionado) {
      this.formulario.get('idcliente')?.setValue(clienteSeleccionado._id);
      this.formulario
        .get('nombreCliente')
        ?.setValue(clienteSeleccionado.nombreCompleto);
    } else {
      this.formulario.get('idcliente')?.setValue('');
      this.formulario.get('nombreCliente')?.setValue('');
    }
  }

  calcularTotal(): void {
    const precioPlan = +this.formulario.get('precioPlan')?.value || 0;
    const precioProducto = +this.formulario.get('precioProducto')?.value || 0;
    const descuento = +this.formulario.get('descuento')?.value || 0;
    const cantidadProducto =
      +this.formulario.get('CantidadProducto')?.value || 1;

    let subTotal = (precioPlan + precioProducto) * cantidadProducto;

    let total = subTotal;

    if (descuento > 0) {
      total -= (subTotal * descuento) / 100; // Aplicar descuento
    }

    this.formulario.get('subtotal')?.setValue(subTotal);
    this.formulario.get('totalPagar')?.setValue(total);
  }

  enviarFormulario() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      const clienteSeleccionado = this.clientes.find(
        (cliente) => cliente._id === formData.idcliente
      );
      if (clienteSeleccionado) {
        // Agregar tanto el ID como el nombre del cliente al objeto formData
        formData.idcliente = {
          _id: formData.idcliente,
          nombreCompleto: clienteSeleccionado.nombreCompleto,
        };
      }
      if (this.isEditMode && this.facturaId) {
        // Verificar si la actualización ya se realizó antes de proceder
        if (!this.isUpdating) {
          this.isUpdating = true; // Establecer la bandera de actualización
          formData._id = this.facturaId;
          this.facturacionService.updateFactura(formData).subscribe(
            (response) => {
              this.router.navigate(['/facturacion/list']);
            },
            (error) => {
              console.error('Error al actualizar usuario:', error);
              this.isUpdating = false; // Restablecer la bandera en caso de error
            }
          );
        } else {
          console.log('La actualización de la factura ya está en curso.');
        }
      } else {
        this.facturacionService.postFactura(formData).subscribe(
          (response) => {
            this.router.navigate(['/facturacion/list']);
          },
          (error) => {
            console.error('Error al agregar usuario:', error);
          }
        );
      }
    } else {
      console.error(
        'El formulario es inválido. Por favor, completa correctamente todos los campos.'
      );
    }
  }
  checkPrintMode() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('imprimir')) {
      this.isPrintMode = true;
    }
  }

  imprimirFactura() {
    this.isPrintMode = true;
    setTimeout(() => {
      // Abre el cuadro de diálogo de impresión
      window.print();
      // Después de la impresión, restablece el modo de impresión
      this.isPrintMode = false;
    }, 500);
  }
}
