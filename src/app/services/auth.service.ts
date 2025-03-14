import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user.model'; // ✅ Import correct User model

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // JSON Server endpoint

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Check if user exists in db.json
  login(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(users[0]));
          return true;
        }
        return false;
      })
    );
  }

  // ✅ Register new user in db.json
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // ✅ Logout
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // ✅ Check login status
  isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedIn');
  }
}
