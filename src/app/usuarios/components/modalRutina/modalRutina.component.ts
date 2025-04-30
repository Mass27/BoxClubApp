import { Component, OnInit,Inject  } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutinasService } from 'src/app/rutinas/services/rutinas.service';
import { Rutinas } from 'src/app/rutinas/interfaces/rutinas.interfaces';
import { Clientes } from '../../interfaces/usuario.interfaces';
import { IDUsuarios } from '../../interfaces/usuId.interface';

@Component({
  selector: 'app-modalRutina',
  templateUrl: './modalRutina.component.html',
  styleUrls: ['./modalRutina.component.css']
})
export class ModalRutinaComponent implements OnInit {

  rutinas: Rutinas[] = [];
  rutinaSeleccionada: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalRutinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDUsuarios, // Recibimos el cliente
    private usuarioService: usuarioService,
    private rutinasService:RutinasService
  ) {}

  ngOnInit() {
    // Obtener las rutinas disponibles
    this.rutinasService.getAllRutinas().subscribe((rutinas) => {
      this.rutinas = rutinas;
      console.log('Rutinas cargadas:', this.rutinas);
    });
  }

  asignarRutina() {
    if (this.rutinaSeleccionada) {
      console.log('clienteId:', this.data._id);
      this.usuarioService.asignarRutina(this.data._id, this.rutinaSeleccionada).subscribe(
        (response) => {
          alert(response.message || 'Rutina asignada correctamente');
          this.dialogRef.close({ success: true });
        },
        (error) => {
          console.error('Error al asignar rutina:', error);
          // Manejo de error
          this.dialogRef.close({ success: false });
        }
      );
    } else {
      console.log('No se ha seleccionado una rutina');
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}
