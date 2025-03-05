import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: { email: string, password: string }[] = [
    { email: 'PerroVerde@gmail.com', password: '1234' },
    { email: 'ElprofeGuillermo@gmail.com', password: '12345' },
    { email: 'melvisyaelc@gmail.com', password: '123456' }
  ];

  constructor(private router: Router) { }

  login(email: string, password: string): boolean {
    email = email.trim().toLowerCase();
    password = password.trim();

    // Validación de campos vacíos
    if (!email || !password) {
      alert('El email y la contraseña son obligatorios');
      return false; // Retorna false si hay campos vacíos
    }

    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      localStorage.setItem('user', email);
      this.router.navigate(['/inicio']);
      return true;
    }

    // alert('Credenciales incorrectas');
    return false;
  }



  register(email: string, password: string): boolean {
    email = email.trim().toLowerCase();
    password = password.trim();

    if (!email || !password) {
    Swal.fire({
      title: 'El email y la contraseña son obligatorios',
      icon: 'error',
      text: 'Complete los campos',
      timer: 2000

    })
      return false;
    }

    if (this.users.some(user => user.email === email)) {
      alert('El usuario ya existe');
      return false;
    }

    this.users.push({ email, password });
    // alert('Usuario registrado exitosamente');
    return true;
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
