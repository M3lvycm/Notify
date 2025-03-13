import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importa Router
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router // Inyecta Router aquí
  ) { }

  login() {
    if (!this.username.trim() || !this.password.trim()) {
      Swal.fire({
        title: 'Error',
        text: 'El email y la contraseña son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const result = this.authService.login(this.username, this.password);
    if (!result.success) {
      if (result.message === 'El usuario no existe') {
        // Mostrar SweetAlert2 para redirigir al registro
        Swal.fire({
          title: '¿Eres nuevo?',
          text: 'Regístrate para continuar',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Registrarme',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/register']); // Redirigir a la página de registro
          }
        });
      } else if (result.message === 'Credenciales incorrectas') {
        // Mostrar error de credenciales incorrectas
        Swal.fire({
          title: 'Error',
          text: 'La contraseña es incorrecta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {
        // Mostrar otro error (por ejemplo, campos vacíos)
        Swal.fire({
          title: 'Error',
          text: result.message,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }
}
