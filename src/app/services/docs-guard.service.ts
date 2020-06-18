import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DocsGuardService implements CanActivate {

  constructor(private userSer: UserService, private router: Router) { }

  canActivate() {
    if (this.userSer.isLoggedin()) {
      this.router.navigate(['']);
      return false
    } else {
      return true;
    }
  }
}
