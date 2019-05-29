import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(currentUser);
    if (currentUser) {
      return true; // authorized 
    }

    console.log(state.url);
    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});
    return false;
  }
}