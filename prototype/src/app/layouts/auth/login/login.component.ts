import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { User } from 'app/interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  loading = false;
  submitted = false;
  hide: boolean = true;
  loginForm: FormGroup;
  userNameCtrl: FormControl;
  passwordCtrl: FormControl;
  redirectUrl: string;

  constructor(public authService: AuthService,
              private formBuilder: FormBuilder,       
              public router: Router,
              private route: ActivatedRoute) { 
                if (this.authService.currentUserValue) {
                  this.router.navigate(['/']);
                }
              }

  ngOnInit() {
    this.user = new User;
    this.userNameCtrl = this.formBuilder.control('', Validators.required);
    this.passwordCtrl = this.formBuilder.control('', Validators.required);

    this.loginForm = this.formBuilder.group({
      userName: this.userNameCtrl,
      password: this.passwordCtrl,
    });

    this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/auth';
    console.log(this.redirectUrl);
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.authService.login(this.userNameCtrl.value, this.passwordCtrl.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.redirectUrl]);
        },
        error => {
          this.loading = false;
        });
  }

}
