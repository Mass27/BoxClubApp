import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlanesService } from '../../services/planes.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    if (this.formulario.valid) {
      const formData = this.formulario.value;
      if (this.isEditMode) {
        formData._id = this.planeId; 
        this.planesServices.updateProducto(formData).subscribe(
          (response) => {
            console.log('Planes actualizado exitosamente:', response);
            this.router.navigate(['/planes/list']);
          },
          (error) => {
            console.error('Error al actualizar empleado:', error);
          }
        );
      } else {
        this.planesServices.postPlanes(formData).subscribe(
          (response) => {
            console.log('Planes agregado exitosamente:', response);
            this.router.navigate(['/planes/list']);
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

  limitarInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace('-', '');
    event.target.value = inputValue;
  }
}
