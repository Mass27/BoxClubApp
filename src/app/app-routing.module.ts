import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './Shared/layout-main/layout-main.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'empleados',
        loadChildren: () =>
          import('./Empleados/empleados.module').then((em) => em.EmpleadosModule),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./usuarios/usuarios.module').then((usu) => usu.UsuariosModule),
      },
      {
        path: 'facturacion',
        loadChildren: () =>
          import('./facturacion/facturacion.module').then((fac) => fac.FacturacionModule),
      },
      {
        path: 'rutinas',
        loadChildren: () =>
          import('./rutinas/rutinas.module').then((rut) => rut.RutinasModule),
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./productos/productos.module').then((prod) => prod.ProductosModule),
      },
      {
        path: 'planes',
        loadChildren: () =>
          import('./planes/planes.module').then((pl) => pl.PlanesModule),
      },
      {
        path: 'metricas',
        loadChildren: () =>
          import('./metricas/metricas.module').then((met) => met.MetricasModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
