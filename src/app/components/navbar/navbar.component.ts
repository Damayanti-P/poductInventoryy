import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,  // Standalone component
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout the user
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
