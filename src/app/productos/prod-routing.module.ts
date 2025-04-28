import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutProComponent } from './pages/layout-pro/layout-pro.component';
import { ListProComponent } from './pages/list-pro/list-pro.component';
import { AgregarProdComponent } from './pages/agregar-prod/agregar-prod.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutProComponent,
    children: [
      {
        path: 'list',
        component: ListProComponent,
      },
      {
        path: 'agregar',
        component: AgregarProdComponent,
      },
      {
        path: 'edit/:id',
        component: AgregarProdComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosRoutingModule {}
