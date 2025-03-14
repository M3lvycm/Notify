import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  formLogin: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
       this.formLogin = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/)]],
       });
  }

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

        Swal.fire({
          title: '¿Eres nuevo?',
          text: 'Regístrate para continuar',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Registrarme',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/register']);
          }
        });
      } else if (result.message === 'Credenciales incorrectas') {

        Swal.fire({
          title: 'Error',
          text: 'La contraseña es incorrecta',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else {

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
