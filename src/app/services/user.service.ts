import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userData;

  constructor(private http: HttpClient, private router: Router) { }

  login(user) {
    return this.http.post('http://68.183.42.41:8013/api/v1/login', user);
  }

  isLoggedin() {
    let token = localStorage.getItem("session-id");
    return !!token;
  }
}
