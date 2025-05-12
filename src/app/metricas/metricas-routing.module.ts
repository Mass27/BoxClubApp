import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMetricasComponent } from './pages/layout-metricas/layout-metricas.component';
import { ListMetricasComponent } from './pages/list-metricas/list-metricas.component';
import { AgregarMetricasComponent } from './pages/agregar-metricas/agregar-metricas.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutMetricasComponent,
    children: [
      {
        path: 'list',
        component: ListMetricasComponent,
      },
      {
        path: 'agregar',
        component: AgregarMetricasComponent,
      },
      {
        path: 'edit/:id',
        component: AgregarMetricasComponent,
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
export class MetricaRoutingModule {}
