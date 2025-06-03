import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../services/empleados.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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
      tipoEmpleado:new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.empleadoId = id;
        this.empleadosService.getEmpleadoById(id).subscribe((empleado) => {
          this.formulario.patchValue(empleado);
        });
      }
    });
  }

 enviarForm() {
  if (this.formulario.invalid) {
    const camposInvalidos: string[] = [];

    Object.keys(this.formulario.controls).forEach((campo) => {
      const control = this.formulario.get(campo);
      if (control && control.invalid) {
        switch (campo) {
          case 'identidad':
            camposInvalidos.push('Identidad');
            break;
          case 'nombreCompleto':
            camposInvalidos.push('Nombre Completo');
            break;
          case 'numeroTelefono':
            camposInvalidos.push('Número de Teléfono');
            break;
          case 'correo':
            camposInvalidos.push('Correo Electrónico');
            break;
          case 'tipoEmpleado':
            camposInvalidos.push('Tipo de Empleado');
            break;
        }
      }
    });

    this.formulario.markAllAsTouched();

     Swal.fire({
      title: '🚫 Faltan datos obligatorios',
      html:
        '<p style="font-size: 15px;">Completa los siguientes campos:</p><ul style="text-align:left;">' +
        camposInvalidos.map((campo) => `<li>📌 ${campo}</li>`).join('') +
        '</ul>',
      icon: 'error',
      background: '#fff',
      confirmButtonText: 'Entendido',
      customClass: {
        confirmButton: 'swal2-confirm-custom',
      },
    });

    return;
  }

  const formData = this.formulario.value;

  if (this.isEditMode) {
    formData.idempleado = this.empleadoId;
    this.empleadosService.updateEmpleado(formData).subscribe(
      () => this.router.navigate(['/empleados/list']),
      (error) => console.error('Error al actualizar empleado:', error)
    );
  } else {
    this.empleadosService.addEmpleados(formData).subscribe(
      () => this.router.navigate(['/empleados/list']),
      (error) => console.error('Error al agregar empleado:', error)
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
