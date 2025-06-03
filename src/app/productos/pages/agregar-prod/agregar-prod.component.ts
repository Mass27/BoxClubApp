import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-prod',
  templateUrl: './agregar-prod.component.html',
  styleUrls: ['./agregar-prod.component.css'],
})
export class AgregarProdComponent implements OnInit {
  public formulario: FormGroup;
  public isEditMode: boolean = false;
  public prodId: string | undefined;
  public isUpdating: boolean = false;
  public selectedFile: File | null = null;
  currentImageUrl: string | null = null;

  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.formulario = new FormGroup({
      imagen: new FormControl(''),
      nombreProducto: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required]),
      cantidadEnStock: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.prodId = id;
        this.productosService.getProdById(id).subscribe((prod) => {
          if (prod) {
            // Mostrar la imagen actual del usuario
            if (prod.imagen) {
              this.currentImageUrl = prod.imagen;
            } else {
              this.currentImageUrl = null;
            }
            this.formulario.patchValue({
            imagen: this.currentImageUrl,
              nombreProducto: prod.nombreProducto,
              descripcion: prod.descripcion,
              precio: prod.precio,
              cantidadEnStock: prod.cantidadEnStock,
            });
          }
        });
      }
    });
  }

 enviarFormulario() {
  if (this.formulario.invalid) {
    const camposInvalidos: string[] = [];

    Object.keys(this.formulario.controls).forEach((campo) => {
      const control = this.formulario.get(campo);
      if (control && control.invalid) {
        switch (campo) {
          case 'nombreProducto':
            camposInvalidos.push('Nombre del Producto');
            break;
          case 'descripcion':
            camposInvalidos.push('Descripción');
            break;
          case 'precio':
            camposInvalidos.push('Precio');
            break;
          case 'cantidadEnStock':
            camposInvalidos.push('Cantidad en Stock');
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

  if (this.isEditMode && this.prodId) {
    if (!this.isUpdating) {
      this.isUpdating = true;
      formData._id = this.prodId;
      this.productosService.updateProductos(formData).subscribe(
        () => {
          if (this.prodId) {
            this.uploadImage(this.prodId);
          }
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
          this.isUpdating = false;
        }
      );
    } else {
      console.log('La actualización del producto ya está en curso.');
    }
  } else {
    this.productosService.postProductos(formData).subscribe(
      (response) => {
        const nuevoProd = response._id;
        this.uploadImage(nuevoProd);
      },
      (error) => {
        console.error('Error al agregar producto:', error);
      }
    );
  }
}


  uploadImage(idproducto: string) {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('idproducto', idproducto);
      formData.append('img', this.selectedFile);

      this.productosService.uploadImage(formData).subscribe(
        (response) => {
             console.log('Imagen cargada exitosamente:', response);
          this.router.navigate(['/productos/list']);
        },
        (error) => {
          console.error('Error al cargar imagen:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
      this.router.navigate(['/productos/list']);
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      // Actualizar currentImageUrl con la URL de la nueva imagen seleccionada
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  limitadorNegayMax(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace('-', '');
    event.target.value = inputValue;
  }
}
