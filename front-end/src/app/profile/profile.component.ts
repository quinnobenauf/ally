import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { AccountService } from '../account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  isUserLoaded: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    /* TODO: how to implement a find by ID without exposing user record */
    this.getUserById('5cbd80347e97260c2f7771bc');
    this.isUserLoaded = true; // this is not a fix must wait for get response before rendering profile page
  }

  getUserById(id: string): void {
    this.accountService.getUserById(id)
    .subscribe((res: User) => {
      this.user = res;
      console.log(res);
    });
  }

}

/*  USER IDs
    TODO: how to get ids not generate by mongodb?
    alonzoj:    5cbd85167e97260c2f7771c8
    bursteino:  5cbd803e7e97260c2f7771bd
    obenaufq:   5cbd80267e97260c2f7771bb
    zoskeb:     5cbd80347e97260c2f7771bc
*/
