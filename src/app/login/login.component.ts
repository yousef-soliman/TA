import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: FormGroup;
  disabled = false;
  loading = false;
  errorMes = '';

  constructor(private userSer: UserService, private router: Router, private fb: FormBuilder) {
    this.loginUser = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(userD) {
    this.disabled = true;
    this.loading = true;
    this.errorMes = '';

    if (userD.status === "VALID") {
      let data = {
        "params": {
          "email": userD.value.email,
          "password": userD.value.password
        }
      }
      this.userSer.login(data).subscribe((res: any) => {
          this.userSer.userData = res.result;
          localStorage.setItem("session-id", this.userSer.userData.session_id);
          localStorage.setItem("company-id", this.userSer.userData.company_id);
          this.router.navigate(['']);

      }, error => {
        this.errorMes = 'Invalid Email or Password';
        this.disabled = false;
        this.loading = false;
      });
    }

  }

  ngOnInit() {
  }

}
