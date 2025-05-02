import { Component, OnInit, Inject } from '@angular/core';
import { usuarioService } from '../../services/usuarios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RutinasService } from 'src/app/rutinas/services/rutinas.service';
import { Rutinas } from 'src/app/rutinas/interfaces/rutinas.interfaces';
import { IDUsuarios } from '../../interfaces/usuId.interface';

@Component({
  selector: 'app-modalRutina',
  templateUrl: './modalRutina.component.html',
  styleUrls: ['./modalRutina.component.css']
})
export class ModalRutinaComponent implements OnInit {
  rutinas: Rutinas[] = [];
  rutinaSeleccionada: string = '';
  rutinasAsignadas: Rutinas[] = [];  // Ahora es un arreglo para las rutinas asignadas

  constructor(
    public dialogRef: MatDialogRef<ModalRutinaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDUsuarios,
    private usuarioService: usuarioService,
    private rutinasService: RutinasService
  ) {}

  ngOnInit() {
    // Obtener las rutinas disponibles
    this.rutinasService.getAllRutinas().subscribe((rutinas) => {
      this.rutinas = rutinas;
    });

    // Obtener las rutinas asignadas al cliente
    this.usuarioService.obtenerRutinasPorCliente(this.data._id).subscribe({
      next: (res) => {
        this.rutinasAsignadas = res.rutinasAsignadas || [];
      },
      error: (err) => {
        console.error('Error al obtener rutinas asignadas:', err);
      }
    });
  }

  asignarRutina() {
    if (this.rutinaSeleccionada) {
      this.usuarioService.asignarRutina(this.data._id, this.rutinaSeleccionada).subscribe(
        (response) => {
          alert(response.message || 'Rutina asignada correctamente');
          this.dialogRef.close({ success: true });
        },
        (error) => {
          console.error('Error al asignar rutina:', error);
          this.dialogRef.close({ success: false });
        }
      );
    } else {
      console.log('No se ha seleccionado una rutina');
    }
  }

  eliminarRutina(rutinaId: string) {
    this.usuarioService.eliminarRutina(this.data._id, rutinaId).subscribe(
      (response) => {
        alert('Rutina eliminada correctamente');
        this.rutinasAsignadas = this.rutinasAsignadas.filter(rutina => rutina._id !== rutinaId);
      },
      (error) => {
        console.error('Error al eliminar rutina:', error);
      }
    );
  }

  cerrar() {
    this.dialogRef.close();
  }
}

