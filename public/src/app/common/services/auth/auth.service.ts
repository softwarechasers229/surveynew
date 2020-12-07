import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router,
    private toastr: ToastrService) { }
  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedIn(): boolean {
    const isLoggedIn = localStorage.getItem('token');
    return (isLoggedIn ? true : false);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
    this.toastr.success('User Logout Successful');
  }

  userDetail() {
    const token = localStorage.getItem('token') || '';
    if (token) {
      return token;
    } else {
      return this.router.navigate(['/login']);
    }
  }


  getToken() {
    return localStorage.getItem('token');
  }

  getUserInfo(): any {
    const userToken = this.getToken();
    if (userToken) {
      let payload = userToken.split('.')[1];
      payload = atob(payload);
      payload = JSON.parse(payload);
      return payload;
    }
    return null;
  }

  getRole(): string {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      return userInfo['role'] || '';
    } else {
      return 'guest';
    }
  }

  getUserId(): string {
    const userInfo = this.getUserInfo();
    if (userInfo) {
      return userInfo['id'] || '';
    } else {
      return null;
    }
  }
}