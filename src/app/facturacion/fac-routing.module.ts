import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutFacComponent } from './pages/layout-fac/layout-fac.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarFacComponent } from './pages/agregar-fac/agregar-fac.component';
import { FacturacionprintComponent } from './components/facturacionprint/facturacionprint.component';


const routes: Routes = [
 { path: '',
  component: LayoutFacComponent,
  children: [
    {
      path: 'list',
      component: ListComponent
    },
    {
      path: 'agregar',
      component: AgregarFacComponent
    },
    {
      path: 'edit/:id',
      component: AgregarFacComponent
    },
    {
      path: 'imprimir/:id',
      component: FacturacionprintComponent
    },
    {
      path: '**',
      redirectTo: 'list'
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }
