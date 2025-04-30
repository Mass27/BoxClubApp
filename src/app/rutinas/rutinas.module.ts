import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutinaRoutingModule } from './rutina-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRutinasComponent } from './pages/layoutRutinas/layoutRutinas.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarRutinasComponent } from './pages/agregarRutinas/agregarRutinas.component';



@NgModule({
  declarations: [
    LayoutRutinasComponent,
    ListComponent,
    AgregarRutinasComponent,
    
  ],
  imports: [
  CommonModule,
    RutinaRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RutinasModule { }
