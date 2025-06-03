import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { Clientes } from '../../interfaces/usuario.interfaces';
import { Planes } from '../../../planes/interfaces/planes.interface';
import { IDUsuarios } from '../../interfaces/usuId.interface';
import {
  LoginAccess,
  Permisos,
} from 'src/app/auth/interfaces/userAccess.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ThemePalette } from '@angular/material/core';
import { ContadorActivos } from '../../interfaces/contadorActivos.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalRutinaComponent } from '../../components/modalRutina/modalRutina.component';
import { ClientePage } from '../../interfaces/clientesPagin.interfaces';
import { ClientesPendientes } from '../../interfaces/ClientesPen.interfaces';
import { ContadorInac } from '../../interfaces/contadorClientesInac.interfaces';
@Component({
  selector: 'app-list-usuarios',
   styleUrls: ['./list-usuarios.component.css'],
  templateUrl: './list-usuarios.component.html',
})
export class ListUsuariosComponent implements OnInit {
   @ViewChild('bandeja') bandejaRef!: ElementRef;
  @ViewChild('btnNoti') botonRef!: ElementRef;
  users: Clientes[] = [];
  allUsers: Clientes[] = [];
  tipPlanes: Planes[] = [];
  usuariosFiltrados: Clientes[] = [];
  totalClientes: number = 0;
currentPage: number = 1;
limit: number = 10;
totalPages: number = 0;

  mostrarInactivos: boolean = false;
  mostrarPendientes: boolean = false;

  contadorClientesActivos: number = 0;
    contadorClientesPen: number = 0;
     contadorClientesInac: number = 0;
     
  userPermissions: LoginAccess[] = [];
  isAdmin: boolean = false;
  usuariosConTresDiasRestantes: Clientes[] = [];
  mostrarBandeja: boolean = false;
isEntrenador: boolean = false;
  constructor(
    private usuarioService: usuarioService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioService
      .getAllplanes()
      .subscribe((planes) => (this.tipPlanes = planes));
    this.adminUser();
    this.contarClientesActivos();
    this.contarClientesPendientes();
    this.contarClientesInactivos();
  }
cargarUsuarios(page: number = 1): void {
  this.usuarioService.getuserPaginated(page, this.limit).subscribe((data) => {
    this.users = data.clientes;
    this.allUsers = data.clientes;
    this.totalClientes = data.total;
    this.totalPages = data.totalPages;
    this.currentPage = data.page;
    this.filterUsuarios();
    this.updateUsuariosConTresDiasRestantes();
    console.log(this.users);
  });
}
 adminUser() {
  const tipoUsuario = sessionStorage.getItem('tipoUsuario');
  this.isAdmin = tipoUsuario === 'ADMINISTRADOR';
  this.isEntrenador = tipoUsuario === 'entrenadores';
}
  toggleBandeja() {
    this.mostrarBandeja = !this.mostrarBandeja;
    if (this.mostrarBandeja) {
      this.updateUsuariosConTresDiasRestantes();
    }
  }

  updateUsuariosConTresDiasRestantes() {
    this.usuariosConTresDiasRestantes = this.allUsers.filter(
      (user) => user.diasRestantes === 27
    );
  }


  filterUsuarios() {
    if (this.mostrarInactivos) {
      this.usuariosFiltrados = this.allUsers.filter(
        (user) => user.estado === 'Inactivo'
      );
    } else if (this.mostrarPendientes) {
      this.usuariosFiltrados = this.allUsers.filter(
        (user) => user.estado === 'Pendiente'
      );
    } else {
      this.usuariosFiltrados = this.allUsers.filter(
        (user) => user.estado === 'Activo'
      );
    }
  }

  mostrarUsuarios(estado: string) {
    if (estado === 'Activos') {
      this.mostrarInactivos = false;
      this.mostrarPendientes = false;
    } else if (estado === 'Inactivos') {
      this.mostrarInactivos = true;
      this.mostrarPendientes = false;
    } else if (estado === 'Pendientes') {
      this.mostrarInactivos = false;
      this.mostrarPendientes = true;
    }
    this.filterUsuarios();
  }

  formatDate(date: string): string {
   
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];
  }

  alternarUsuarios() {
    this.mostrarInactivos = !this.mostrarInactivos;
    this.filterUsuarios();
  }
  getPlanName(planId: string): string {
    const plan = this.tipPlanes.find((p) => p._id === planId);
    return plan ? plan.nombrePlan : 'Plan no encontrado';
  }

 buscarClientePorNombre(nombre: string): void {
  if (nombre.trim() === '') {
    this.filterUsuarios(); 
    return;
  }

  this.usuarioService.bcNombre(nombre).subscribe(
    (usuarios: IDUsuarios[]) => {
      this.usuariosFiltrados = usuarios;
    },
    (error) => {
      console.error('Error al buscar clientes por nombre:', error);
    }
  );
}

  contarClientesActivos() {
    this.usuarioService.contarClietnesActivos().subscribe(
      (clientesActivos: ContadorActivos) => {
        this.contadorClientesActivos = clientesActivos.cantidadClientesActivos;
      },
      (error) => {
        console.error('Error al contar clientes activos:', error);
      }
    );
  }


  contarClientesPendientes() {
    this.usuarioService.contarClietnesPendientes().subscribe(
      (clientesPendientes: ClientesPendientes) => {
        this.contadorClientesPen = clientesPendientes.cantidadClientesPen;
      },
      (error) => {
        console.error('Error al contar clientes activos:', error);
      }
    );
  }


contarClientesInactivos() {
    this.usuarioService.contarClietnesInactivos().subscribe(
      (clientesInactivos: ContadorInac) => {
        this.contadorClientesInac = clientesInactivos.cantidadClientesInactivos;
      },
      (error) => {
        console.error('Error al contar clientes activos:', error);
      }
    );
  }



  asignarRutina(usuarioId: string) {
    const dialogRef = this.dialog.open(ModalRutinaComponent, {
      width: '500px',
      data: { _id: usuarioId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
      
        alert('Rutina asignada correctamente');
      } else {
       
      }
    });
  }

 @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const clickedInsideBandeja = this.bandejaRef?.nativeElement.contains(target);
    const clickedOnButton = this.botonRef?.nativeElement.contains(target);

    if (!clickedInsideBandeja && !clickedOnButton) {
      this.mostrarBandeja = false;
    }
  }

}

