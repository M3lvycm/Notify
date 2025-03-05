import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrate',
  imports: [FormsModule],
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css'
})
export class RegistrateComponent {
  username = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    const existingUser = this.authService.getUsers().some(user => user.email === this.username);
    if (existingUser) {
      Swal.fire({
        title: 'Error',
        text: 'El usuario ya existe',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }

    if (this.authService.register(this.username, this.password)) {
      Swal.fire({
        title: 'Usuario registrado',
        text: 'Usuario registrado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
      this.router.navigate(['/inicio']);


      
      }
    }
  }

