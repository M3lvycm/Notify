import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: { email: string, password: string }[] = [

  ];

  constructor(private router: Router) { }

  login(email: string, password: string): { success: boolean, message?: string } {
    email = email.trim().toLowerCase();
    password = password.trim();

    // Validación de campos vacíos
    if (!email || !password) {
      return { success: false, message: 'El email y la contraseña son obligatorios' };
    }

    const user = this.users.find(user => user.email === email);

    if (!user) {
      return { success: false, message: 'El usuario no existe' }; // Usuario no existe
    }

    if (user.password !== password) {
      return { success: false, message: 'Credenciales incorrectas' }; // Contraseña incorrecta
    }




    localStorage.setItem('user', email);
    this.router.navigate(['/inicio']);
    return { success: true };
  }



  register(email: string, password: string): boolean {
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
      Swal.fire({
        title: 'Error',
        text: 'El email y la contraseña son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }

    if (this.users.some(user => user.email === email)) {
      Swal.fire({
        title: 'Error',
        text: 'El usuario ya existe',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      return false;
    }
    // if (password.length < 5 ) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'La contraseña debe tener al menos 5 caracteres',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar'
    //   });
    //   return false;
    // }
    // if (!/[A-Z]/.test(password)) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'La contraseña debe contener al menos una letra mayúscula',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar',
    //   });
    //   return false;
    // }



    // if (!/[0-9]/.test(password)) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'La contraseña debe contener al menos un número',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar',
    //   });
    //   return false;
    // }

    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'La contraseña debe contener al menos un símbolo',
    //     icon: 'error',
    //     confirmButtonText: 'Aceptar',
    //   });
    //   return false;
    // }

    // Guardar usuario en la lista
    this.users.push({ email, password });

    // Guardar en localStorage para persistencia
    localStorage.setItem('user', email);

    return true; // Indicar que el registro fue exitoso
  }


  getUsers(): { email: string, password: string }[] {
    return this.users;
  }


  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('user') !== null;
  }
}
