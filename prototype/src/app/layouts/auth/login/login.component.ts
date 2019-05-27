import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';

import { AuthService } from '../auth.service';
import { UserService } from 'app/services/user.service';
import { User } from 'app/interfaces/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  hide: boolean = true;
  loginForm: FormGroup;
  userNameCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor(public authService: AuthService,
              private accountService: UserService,
              private formBuilder: FormBuilder,       
              public router: Router) { }

  ngOnInit() {
    this.user = new User;
    this.userNameCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.loginForm = this.formBuilder.group({
      userName: this.userNameCtrl,
      password: this.passwordCtrl,
    });
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        this.accountService.getUserById(this.userNameCtrl.value).subscribe((user) => {
          this.user = user;
          console.log(this.user)
          let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : 'login/user';

          this.router.navigateByUrl(redirect);
        });
        
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
