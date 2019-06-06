import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "../../interfaces/user";
import { UserService } from "../../services/user.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-create-user",
  templateUrl: "./create-user.component.html",
  styleUrls: ["./create-user.component.scss"]
})
export class CreateUserComponent implements OnInit {
  userData: User;
  hide: boolean = true;
  userForm: FormGroup;
  userNameCtrl: FormControl;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  passwordCtrl: FormControl;
  emailCtrl: FormControl;

  constructor(
    private accountService: UserService,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.userData = new User();
    this.userNameCtrl = this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(5)
    ]);
    this.firstNameCtrl = this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(3)
    ]);
    this.lastNameCtrl = this.formBuilder.control("", [
      Validators.required,
      Validators.minLength(2)
    ]);
    this.passwordCtrl = this.formBuilder.control("", [
      Validators.required,
      Validators.pattern(
        "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}"
      )
    ]);
    this.emailCtrl = this.formBuilder.control("", [
      Validators.required,
      Validators.email
    ]);

    this.userForm = this.formBuilder.group({
      userName: this.userNameCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl
    });
  }

  get userName() {
    return this.userForm.get("userName");
  }
  get firstName() {
    return this.userForm.get("firstName");
  }
  get lastName() {
    return this.userForm.get("lastName");
  }
  get password() {
    return this.userForm.get("password");
  }
  get email() {
    return this.userForm.get("email");
  }

  createUser(): void {
    this.userData = this.userForm.value;
    this.authService.register(this.userData).subscribe((res: User) => {
      let redirect = this.authService.redirectUrl
        ? this.router.parseUrl(this.authService.redirectUrl)
        : "/";
      console.log(res);
      this.router.navigateByUrl(redirect);
    });
  }
}
