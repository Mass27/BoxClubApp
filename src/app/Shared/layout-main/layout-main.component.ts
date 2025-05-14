import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-header.css'],
})
export class LayoutMainComponent implements OnInit {
  isAdmin: boolean = false;
  menuVisible: MenuItem[] = [];

  menuAdmin: MenuItem[] = [
    { label: 'Clientes', link: '/usuarios/list' },
    { label: 'Rutinas', link: '/rutinas/list' },
    { label: 'Metricas', link: '/metricas/list' },
     { label: 'Empleados', link: '/empleados/list' },
     { label: 'Productos', link: '/productos/list' },
     { label: 'Planes', link: '/planes/list' },
    { label: 'Facturacion', link: '/facturacion/list' },
  ];

 menuEntrenador: MenuItem[] = [
    { label: 'Clientes', link: '/usuarios/list' },
    { label: 'Rutinas', link: '/rutinas/list' },
    { label: 'Metricas', link: '/metricas/list' },
  ];

  constructor(private router: Router) {}

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioLogin');
    sessionStorage.removeItem('tipoUsuario');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.setMenuByTipoUsuario();
  }
  setMenuByTipoUsuario(): void {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    this.isAdmin = tipoUsuario === 'ADMINISTRADOR';

    this.menuVisible = this.isAdmin ? this.menuAdmin : this.menuEntrenador;
  }
}
