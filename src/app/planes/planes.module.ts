import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesRoutingModule } from './planes-routing.module';
import { LayoutPlanesComponent } from './pages/layout-planes/layout-planes.component';
import { ListPlComponent } from './pages/list-pl/list-pl.component';
import { AgregarPlComponent } from './pages/agregar-pl/agregar-pl.component';
import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutPlanesComponent,
    ListPlComponent,
    AgregarPlComponent,
    SearchboxComponent
  ],
  imports: [
    CommonModule,
    PlanesRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PlanesModule { }
