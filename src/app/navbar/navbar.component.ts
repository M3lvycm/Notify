import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
