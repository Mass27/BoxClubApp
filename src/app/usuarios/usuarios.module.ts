import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { SharedModule } from '../Shared/shared.module';
import { LayoutUsuariosComponent } from './pages/layout-usuarios/layout-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { ModalRutinaComponent } from './components/modalRutina/modalRutina.component';

@NgModule({
  declarations: [
    ListUsuariosComponent,
    AgregarComponent,
    LayoutUsuariosComponent,
    SearchBoxComponent,
    ModalRutinaComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
MatIconModule,
MatSnackBarModule,
MatSelectModule,
MatDialogModule

  ]
})
export class UsuariosModule { }
