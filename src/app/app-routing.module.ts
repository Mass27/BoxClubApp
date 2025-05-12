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
    path: 'empleados',
   canActivate: [AuthGuard],
    loadChildren: () =>
      import('./Empleados/empleados.module').then((em) => em.EmpleadosModule),
  },
  {
    path: 'usuarios',
   canActivate: [AuthGuard],
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((usu) => usu.UsuariosModule),
  },
  {
    path: 'facturacion',
   canActivate: [AuthGuard],
    loadChildren: () =>
      import('./facturacion/facturacion.module').then(
        (fac) => fac.FacturacionModule
      ),
  },{
    path: 'rutinas',
   canActivate: [AuthGuard],
    loadChildren: () =>
      import('./rutinas/rutinas.module').then(
        (rut) => rut.RutinasModule
      ),
  },
  {
    path: 'productos',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./productos/productos.module').then(
        (prod) => prod.ProductosModule
      ),
  },
  {
    path: 'planes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./planes/planes.module').then((pl) => pl.PlanesModule),
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: LayoutMainComponent,
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
