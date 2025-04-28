import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutProComponent } from './pages/layout-pro/layout-pro.component';
import { ListProComponent } from './pages/list-pro/list-pro.component';
import { AgregarProdComponent } from './pages/agregar-prod/agregar-prod.component';
import { ProductosRoutingModule } from './prod-routing.module';
import { SharedModule } from '../Shared/shared.module';
import {  HttpClientModule } from '@angular/common/http';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutProComponent,
    ListProComponent,
    AgregarProdComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProductosModule { }
