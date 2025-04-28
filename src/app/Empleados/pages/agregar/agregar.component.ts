import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  public formulario: FormGroup;
  public isEditMode: boolean = false;
  public empleadoId: number | undefined;

  constructor(
    private empleadosService: EmpleadosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.formulario = new FormGroup({
      identidad: new FormControl('', Validators.required),
      nombreCompleto: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.empleadoId = id;
        this.empleadosService.getEmpleadoById(id).subscribe((empleado) => {
          this.formulario.patchValue(empleado); // Rellenar el formulario con los datos del empleado
        });
      }
    });
  }

  enviarForm() {
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      if (this.isEditMode) {
        formData.idempleado = this.empleadoId; // Agregar el id del empleado al objeto
        this.empleadosService.updateEmpleado(formData).subscribe(
          (response) => {
            this.router.navigate(['/empleados/list']);
          },
          (error) => {
            console.error('Error al actualizar empleado:', error);
          }
        );
      } else {
        this.empleadosService.addEmpleados(formData).subscribe(
          (response) => {
            this.router.navigate(['/empleados/list']);
          },
          (error) => {
            console.error('Error al agregar empleado:', error);
          }
        );
      }
    } else {
      console.error(
        'El formulario es inválido. Por favor, completa correctamente todos los campos.'
      );
    }
  }

  limitarNumeroTelefono(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
  }

  limitarIdentidad(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');
    event.target.value = inputValue;
  }
}
