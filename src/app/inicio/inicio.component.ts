import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { routes } from '../app.routes';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-inicio',
  imports: [FooterComponent,NavbarComponent,RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']); // Redirigir al login si no está autenticado
    }
  }


  logout() {
    this.authService.logout();
  }
}
