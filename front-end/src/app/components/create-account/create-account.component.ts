import { Component, OnInit } from '@angular/core';

import { User } from '../../interfaces/user';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  hide: boolean = true;
  user: User;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }

  createUser(first: string, last: string, user: string, pass: string): void {
    this.user = new User();
    this.user.firstName = first;
    this.user.lastName = last;
    this.user.userName = user;
    this.user.password = pass;
    this.accountService.createUser(this.user).subscribe(res => console.log(res));
  }

}
