import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

interface MenuItem {
  label: string;
  link: string;
    children?: MenuItem[];
    icon?:string;
}

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-header.css'],
})
export class LayoutMainComponent implements OnInit {
  isAdmin: boolean = false;
  menuVisible: MenuItem[] = [];
isHandset = false;
  sidenavOpened = false;
    @ViewChild('sidenav') sidenav!: MatSidenav;

 menuAdmin: MenuItem[] = [
  { label: 'Clientes', link: '/usuarios/list', icon: 'group' },
  { label: 'Rutinas', link: '/rutinas/list', icon: 'fitness_center' },
  { label: 'Metricas', link: '/metricas/list', icon: 'bar_chart' },
  { label: 'Gestion', link: '', icon: 'settings', children: [
      { label: 'Empleados', link: '/empleados/list', icon: 'person' },
      { label: 'Productos', link: '/productos/list', icon: 'inventory_2' },
      { label: 'Planes', link: '/planes/list', icon: 'assignment' },
    ]
  },
  { label: 'Facturacion', link: '/facturacion/list', icon: 'receipt_long' },
];

menuEntrenador: MenuItem[] = [
  { label: 'Clientes', link: '/usuarios/list', icon: 'group' },
  { label: 'Rutinas', link: '/rutinas/list', icon: 'fitness_center' },
  { label: 'Metricas', link: '/metricas/list', icon: 'bar_chart' },
];

  constructor(private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioLogin');
    sessionStorage.removeItem('tipoUsuario');
    this.router.navigate(['/auth']);
  }

  ngOnInit(): void {
    this.setMenuByTipoUsuario();
      this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        this.isHandset = result.matches;
        if (!this.isHandset) {
          this.sidenavOpened = false;
        }
      });
  }
  setMenuByTipoUsuario(): void {
    const tipoUsuario = sessionStorage.getItem('tipoUsuario');
    this.isAdmin = tipoUsuario === 'ADMINISTRADOR';

    this.menuVisible = this.isAdmin ? this.menuAdmin : this.menuEntrenador;
  }
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
    if (this.sidenavOpened) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }
}
