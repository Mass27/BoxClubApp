import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent {

 correo: string = '';

  constructor(private dialogRef: MatDialogRef<CorreoComponent>) {}

  cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.dialogRef.close(this.correo);
  }
}
