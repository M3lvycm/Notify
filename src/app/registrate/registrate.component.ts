import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule,   ReactiveFormsModule,   Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrate',
  imports: [FormsModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registrate.component.html',
  styleUrl: './registrate.component.css'
})
export class RegistrateComponent {
  username = '';
  password = '';
  confirmPassword = '';
  formRegister: FormGroup
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {

    this.formRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{5,}$/)]],
     confirmPassword: ['', [Validators.required]],

    })

  }




  register() {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return;
    }
    if (this.formRegister.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
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
