import { Component, OnInit } from '@angular/core';

import { CreateAccountService } from '../create-account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  hide: boolean = true;
  user: string;
  users: string[];

  constructor(private createAccountService: CreateAccountService) { }

  ngOnInit() {
  }

  register(i: string, n: string, u: string): void {
    this.createAccountService.register(JSON.stringify({
      id: i,
      userName: u,
      name: n
    })).subscribe(user => {});

  }

}
