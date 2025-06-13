import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutinaRoutingModule } from './rutina-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRutinasComponent } from './pages/layoutRutinas/layoutRutinas.component';
import { ListComponent } from './pages/list/list.component';
import { AgregarRutinasComponent } from './pages/agregarRutinas/agregarRutinas.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';



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
    FormsModule,
    MatIconModule,
     MatTableModule,
      MatPaginatorModule,
       MatSortModule,
        MatButtonModule,
  ]
})
export class RutinasModule { }
