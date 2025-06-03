import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from '../../services/rutinas.service';
import { EmpleadosService } from 'src/app/Empleados/services/empleados.service';
import { Rutinas } from '../../interfaces/rutinas.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Empleados2 } from 'src/app/Empleados/interfaces/empleados2.interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregarRutinas',
  templateUrl: './agregarRutinas.component.html',
  styleUrls: ['./agregarRutinas.component.css'],
})
export class AgregarRutinasComponent implements OnInit {
  rutinaForm: FormGroup;
  rutinaEditar: Rutinas | null = null;
  isEditMode: boolean = false;
  rutinaId: string | null = null;
  empleados:Empleados2[] = [];
  constructor(
    private fb: FormBuilder,
    private rutinaService: RutinasService,
    private route: ActivatedRoute,
    private router: Router,
    private datepipe: DatePipe,
    private empleadoService: EmpleadosService
  ) {
    this.rutinaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      empleado: ['', Validators.required],
      ejercicios: this.fb.array([]),
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.rutinaId = id;

        this.rutinaService.getRutinaById(id).subscribe((rutina: Rutinas) => {
          this.rutinaForm.patchValue({
            nombre: rutina.nombre,
            descripcion: rutina.descripcion,
            fechaInicio: this.datepipe.transform(rutina.fechaInicio, 'yyyy-MM-dd'),
            fechaFin: this.datepipe.transform(rutina.fechaFin, 'yyyy-MM-dd'),
            empleado: rutina.empleado,
          });

          this.ejercicios.clear();
          rutina.ejercicios.forEach((e) => {
            this.ejercicios.push(
              this.fb.group({
                nombre: [e.nombre, Validators.required],
                repeticiones: [e.repeticiones, Validators.required],
                series: [e.series, Validators.required],
                descanso: [e.descanso, Validators.required],
              })
            );
          });
        });
      }
    });

   this.getempleadoName();
  }
  get ejercicios(): FormArray {
    return this.rutinaForm.get('ejercicios') as FormArray;
  }

  getempleadoName() {
this.empleadoService.getAllEntranadores().subscribe((empleados: Empleados2[]) => {
  this.empleados = empleados;
});
  }

  agregarEjercicio(): void {
    this.ejercicios.push(
      this.fb.group({
        nombre: ['', Validators.required],
        repeticiones: [0, Validators.required],
        series: [0, Validators.required],
        descanso: ['', Validators.required],
      })
    );
  }

  eliminarEjercicio(index: number): void {
    this.ejercicios.removeAt(index);
  }

  enviarForm(): void {
  if (this.rutinaForm.invalid) {
    const camposInvalidos: string[] = [];

    const controles = this.rutinaForm.controls;

    if (controles['nombre'].invalid) camposInvalidos.push('Nombre de la rutina');
    if (controles['descripcion'].invalid) camposInvalidos.push('Descripción');
    if (controles['fechaInicio'].invalid) camposInvalidos.push('Fecha de inicio');
    if (controles['fechaFin'].invalid) camposInvalidos.push('Fecha de fin');
    if (controles['empleado'].invalid) camposInvalidos.push('Entrenador asignado');

    const ejercicios = this.ejercicios.controls;
    ejercicios.forEach((ejercicio, index) => {
      const errores = [];

      if (ejercicio.get('nombre')?.invalid) errores.push('Nombre');
      if (ejercicio.get('repeticiones')?.invalid) errores.push('Repeticiones');
      if (ejercicio.get('series')?.invalid) errores.push('Series');
      if (ejercicio.get('descanso')?.invalid) errores.push('Descanso');

      if (errores.length > 0) {
        camposInvalidos.push(`Ejercicio #${index + 1}: ${errores.join(', ')}`);
      }
    });

    Swal.fire({
    title: '🚫 Faltan datos',
    html: '<p style="font-size: 15px;">Completa los siguientes campos:</p><ul style="text-align:left;">' +
      camposInvalidos.map(campo => `<li>📌 ${campo}</li>`).join('') +
      '</ul>',
    icon: 'error',
    background: '#fff',
    confirmButtonText: 'Entendido',
    customClass: {
      confirmButton: 'swal2-confirm-custom'
    }
  });

    return;
  }

  const rutinaData = this.rutinaForm.value;

  if (this.isEditMode && this.rutinaId) {
    rutinaData._id = this.rutinaId;
    this.rutinaService.updateRutinas(rutinaData).subscribe(
      (res) => {
        Swal.fire({
          title: '✅ Rutina actualizada',
          text: 'La rutina se actualizó correctamente.',
          icon: 'success',
            customClass: {
    confirmButton: 'swal2-confirm-custom'
  }
        }).then(() => this.router.navigate(['/rutinas/list']));
      },
      (err) => {
        Swal.fire('Error', err.error?.message || err.message, 'error');
      }
    );
  } else {
    this.rutinaService.addRutinas(rutinaData).subscribe(
      (res) => {
        Swal.fire({
          title: '✅ Rutina creada',
          text: 'La rutina se ha registrado exitosamente.',
          icon: 'success',
           customClass: {
    confirmButton: 'swal2-confirm-custom'
  }
        }).then(() => this.router.navigate(['/rutinas/list']));
      },
      (err) => {
        Swal.fire('Error', err.error?.message || err.message, 'error');
      }
    );
  }
}
}
