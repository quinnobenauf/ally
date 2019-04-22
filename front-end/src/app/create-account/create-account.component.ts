import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { CreateAccountService } from '../create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  hide: boolean = true;
  user: User;
  constructor(private createAccountService: CreateAccountService) { }

  ngOnInit() {
  }

  createUser(first: string, last: string, user: string, pass: string): void {
    this.user = new User();
    this.user.firstName = first;
    this.user.lastName = last;
    this.user.userName = user;
    this.user.password = pass;
    this.createAccountService.createUser(this.user).subscribe(res => console.log(res));
  }

}
