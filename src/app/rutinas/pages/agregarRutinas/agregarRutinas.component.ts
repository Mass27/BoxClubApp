import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from '../../services/rutinas.service';
import { EmpleadosService } from 'src/app/Empleados/services/empleados.service';
import { Rutinas } from '../../interfaces/rutinas.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Empleados2 } from 'src/app/Empleados/interfaces/empleados2.interfaces';

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
this.empleadoService.getAllEmpleados().subscribe((empleados: Empleados2[]) => {
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
      console.error('Formulario inválido:', this.rutinaForm.value);
      return;
    }

    const rutinaData = this.rutinaForm.value;

    if (this.isEditMode && this.rutinaId) {
      rutinaData._id = this.rutinaId;
      this.rutinaService.updateRutinas(rutinaData).subscribe(
        (res) => {
          console.log('Rutina actualizada:', res);
          this.router.navigate(['/rutinas/list']);
        },
        (err) => {
          console.error('Error al actualizar rutina:', err.error?.message || err.message);
        }
      );
    } else {
      this.rutinaService.addRutinas(rutinaData).subscribe(
        (res) => {
          console.log('Rutina creada:', res);
          this.router.navigate(['/rutinas/list']);
        },
        (err) => {
          console.error('Error al crear rutina:', err.error?.message || err.message);
        }
      );
    }
  }
}
