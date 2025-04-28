import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionRoutingModule } from './fac-routing.module';

import { ListComponent } from './pages/list/list.component';
import { AgregarFacComponent } from './pages/agregar-fac/agregar-fac.component';
import { LayoutFacComponent } from './pages/layout-fac/layout-fac.component';
import { SharedModule } from '../Shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {  MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';


import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
   LayoutFacComponent,
    ListComponent,
    AgregarFacComponent,
    SearchBoxComponent
  ],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule


  ],providers:[

    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class FacturacionModule { }
