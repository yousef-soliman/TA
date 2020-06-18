import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userSer: UserService, private router: Router) { }

  canActivate() {
    if (this.userSer.isLoggedin()) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
