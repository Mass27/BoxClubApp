import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hide = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Si el usuario ya ha iniciado sesión, redirigirlo a la página de empleados
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/empleados']);
    }
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage =
        'Por favor, ingresa un nombre de usuario y una contraseña.';
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.data && response.data.token) {
          sessionStorage.setItem('token', response.data.token);
          if (response.data.token && response.data.usuario.nombreUsuario) {
            sessionStorage.setItem(
              'usuarioLogin',
              response.data.usuario.nombreUsuario
            );
            sessionStorage.setItem(
              'tipoUsuario',
              response.data.usuario.tipoUsuario
            );
          }
          // Redirigir al usuario a la página principal después de iniciar sesión exitosamente
          this.router.navigate(['/usuarios/list']);
        } else {
          this.errorMessage =
            'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Credenciales Invalidas.';
      }
    );
  }
}
