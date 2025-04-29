import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-list-usuarios',
  // styleUrls: ['./list-usuarios.component.css'],
  templateUrl: './list-usuarios.component.html',
})
export class ListUsuariosComponent implements OnInit {
  users: Clientes[] = [];
  allUsers: Clientes[] = [];
  tipPlanes: Planes[] = [];
  usuariosFiltrados: Clientes[] = [];

  mostrarInactivos: boolean = false;
  mostrarPendientes: boolean = false;

  contadorClientesActivos: number = 0;
  userPermissions: LoginAccess[] = [];
  isAdmin: boolean = false;
  usuariosConTresDiasRestantes: Clientes[] = [];
  mostrarBandeja: boolean = false;

  constructor(
    private usuarioService: usuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getAllUser().subscribe((users) => {
      this.users = users;
      this.allUsers = users;
      this.filterUsuarios();
      this.updateUsuariosConTresDiasRestantes();
    });

    this.usuarioService
      .getAllplanes()
      .subscribe((planes) => (this.tipPlanes = planes));
    this.adminUser();
    this.contarClientesActivos();
  }

  adminUser() {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    if (tipoUsuario === 'ADMINISTRADOR') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  toggleBandeja() {
    this.mostrarBandeja = !this.mostrarBandeja;
    if (this.mostrarBandeja) {
      this.updateUsuariosConTresDiasRestantes();
    }
  }

  updateUsuariosConTresDiasRestantes() {
    this.usuariosConTresDiasRestantes = this.allUsers.filter(
      (user) => user.diasRestantes === 3
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
    // Convertir la fecha en formato ISO 8601 a formato yyyy-MM-dd
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
      this.usuariosFiltrados = this.users;
      return;
    }
    this.usuarioService.bcNombre(nombre).subscribe(
      (usuarios: IDUsuarios[]) => {
        // Actualiza las facturas filtradas con los resultados de la búsqueda
        this.usuariosFiltrados = usuarios;
      },
      (error) => {
        console.error('Error al buscar facturas por nombre:', error);
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
}
