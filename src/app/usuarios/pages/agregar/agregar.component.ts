import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuarioService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Planes } from '../../../planes/interfaces/planes.interface';

@Component({
  selector: 'agregar-usuarios',
  templateUrl: './agregar.component.html',
})
export class AgregarComponent implements OnInit {
  public formulario: FormGroup;
  public tipoPlanes: Planes[] = [];
  public isEditMode: boolean = false;
  public usuarioId: string | undefined;
  public isUpdating: boolean = false;
  public imgFile: File | null = null;
  currentImageUrl: string | null = null;
  errorMessage: string = '';
  public estados = [
    { id: 'Activo', desc: 'Activo' },
    { id: 'Inactivo', desc: 'Inactivo' },
    { id: 'Pendiente', desc: 'Pendiente' },
  ];
  constructor(
    private userService: usuarioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = new FormGroup({
      imagen: new FormControl(null),
      nombreCompleto: new FormControl('', Validators.required),
      numeroTelefono: new FormControl('', [
        Validators.required,
        Validators.maxLength(8),
      ]),
      identidad: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      idPlan: new FormControl('', Validators.required),
      fechaIngreso: new FormControl(null, Validators.required),
      estado: new FormControl('Activo'),
    });
  }

  ngOnInit(): void {
    this.obtenerPlanes();
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.usuarioId = id;
        this.userService.getUserId(id).subscribe((usuario) => {
          if (usuario) {
            // Mostrar la imagen actual del usuario
            if (usuario.imagen) {
              this.currentImageUrl = usuario.imagen;
            } else {
              this.currentImageUrl = null;
            }
            this.formulario.patchValue({
              imagen: this.currentImageUrl,
              nombreCompleto: usuario.nombreCompleto || '',
              numeroTelefono: usuario.numeroTelefono || '',
              identidad: usuario.identidad || '',
              correo: usuario.correo || '',
              fechaIngreso: this.formatDate(usuario.fechaIngreso),
              idPlan: usuario.idPlan || '',
              estado: usuario.estado,
            });
          }
        });
      }
    });
  }
  formatDate(date: string): string {
    // Obtener solo la parte de la fecha (sin la hora, minutos, segundos ni la zona horaria)
    const fechaSinHora = date.split('T')[0];
    return fechaSinHora;
  }

  obtenerPlanes() {
    this.userService.getAllplanes().subscribe((planes) => {
      this.tipoPlanes = planes;
    });
  }

  enviarFormulario() {
    // if (this.formulario.valid) {
    const formData = this.formulario.value;
    if (this.isEditMode && this.usuarioId) {
      if (!this.isUpdating) {
        this.isUpdating = true;
        formData._id = this.usuarioId;
        this.userService.updateUser(formData).subscribe(
          (response) => {
            if (this.usuarioId) {
              // Verifica que usuarioId tenga un valor definido
              this.uploadImage(this.usuarioId);
            }
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);

            this.isUpdating = false;
          }
        );
      } else {
        console.log('La actualización del usuario ya está en curso.');
      }
    } else {
      // Si es un nuevo usuario, primero agregamos el usuario
      this.userService.addUser(formData).subscribe(
        (response) => {
          console.log('Usuario agregado exitosamente:', response);
          // Una vez agregado el usuario, subimos la imagen
          const nuevoUsuarioId = response._id; // Suponiendo que el servidor devuelve el ID del nuevo usuario
          this.uploadImage(nuevoUsuarioId);
        },
        (error) => {
          console.error('Error al agregar usuario:', error);
        }
      );
    }
    // }else {
    //   console.error(
    //     'El formulario es inválido. Por favor, completa correctamente todos los campos.'
    //   );
    // }
  }

  uploadImage(clienteId: string) {
    if (this.imgFile) {
      const formData = new FormData();
      formData.append('clienteId', clienteId);
      formData.append('img', this.imgFile); // Asegúrate de que el nombre del campo coincida con el que espera tu servidor

      this.userService.uploadImage(formData).subscribe(
        (response) => {
          console.log('Imagen cargada exitosamente:', response);
          this.router.navigate(['/usuarios/list']);
        },
        (error) => {
          console.error('Error al cargar imagen:', error);
        }
      );
    } else {
      console.error('No se ha seleccionado ninguna imagen.');
      this.router.navigate(['/usuarios/list']);
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imgFile = file;

      // Actualizar currentImageUrl con la URL de la nueva imagen seleccionada
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  limitarNumeroTelefono(event: any) {
    let inputValue = event.target.value;
    const maxLength = 8;
    inputValue = inputValue.replace(/\D/g, '');
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    // Actualizar el valor del campo con el valor modificado
    event.target.value = inputValue;
  }

  limitarIdentidad(event: any) {
    let inputValue = event.target.value;
    const maxLength = 13;

    // Eliminar caracteres que no sean dígitos
    inputValue = inputValue.replace(/\D/g, '');

    // Limitar la longitud del número
    if (inputValue.length > maxLength) {
      inputValue = inputValue.slice(0, maxLength);
    }

    // Actualizar el valor del campo con el valor modificado
    event.target.value = inputValue;
  }
}
