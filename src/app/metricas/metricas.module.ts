import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LayoutMetricasComponent } from './pages/layout-metricas/layout-metricas.component';
import { ListMetricasComponent } from './pages/list-metricas/list-metricas.component';
import { AgregarMetricasComponent } from './pages/agregar-metricas/agregar-metricas.component';
import { MetricaRoutingModule } from './metricas-routing.module';

@NgModule({
   declarations: [
      LayoutMetricasComponent,
      ListMetricasComponent,
      AgregarMetricasComponent,

    ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MetricaRoutingModule
  ],
  exports: [],
})
export class MetricasModule {}
