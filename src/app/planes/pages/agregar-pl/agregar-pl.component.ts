import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanesService } from '../../services/planes.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-pl',
  templateUrl: './agregar-pl.component.html',
  styleUrls: ['./agregar-pl.component.css'],
})
export class AgregarPlComponent implements OnInit {
  public formulario: FormGroup;
  public isEditMode: boolean = false;
  public planeId: number | undefined;
  constructor(
    private planesServices: PlanesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = new FormGroup({
  
      nombrePlan: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required]),
      dias: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.planeId = id;
        this.planesServices.getPlanesById(id).subscribe((planes) => {
      
          this.formulario.patchValue({
            nombrePlan: planes.nombrePlan,
            descripcion: planes.descripcion,
            precio: planes.precio,
            dias: planes.dias

        
          });
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
          case 'nombrePlan':
            camposInvalidos.push('Nombre del Plan');
            break;
          case 'descripcion':
            camposInvalidos.push('Descripción');
            break;
          case 'precio':
            camposInvalidos.push('Precio');
            break;
          case 'dias':
            camposInvalidos.push('Cantidad de Días');
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

  if (this.isEditMode && this.planeId) {
    formData._id = this.planeId;
    this.planesServices.updateProducto(formData).subscribe(
      () => {
        this.router.navigate(['/planes/list']);
      },
      (error) => {
        console.error('Error al actualizar plan:', error);
      }
    );
  } else {
    this.planesServices.postPlanes(formData).subscribe(
      (response) => {
        this.router.navigate(['/planes/list']);
      },
      (error) => {
        console.error('Error al agregar plan:', error);
      }
    );
  }
}


  limitarInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace('-', '');
    event.target.value = inputValue;
  }
}
