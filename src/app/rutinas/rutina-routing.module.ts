import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { LayoutRutinasComponent } from './pages/layoutRutinas/layoutRutinas.component';
import { AgregarRutinasComponent } from './pages/agregarRutinas/agregarRutinas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutRutinasComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'agregar',
        component: AgregarRutinasComponent,
      },
      {
        path: 'edit/:id',
        component: AgregarRutinasComponent,
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
export class RutinaRoutingModule {}
