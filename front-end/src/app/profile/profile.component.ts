import { Component, OnInit } from '@angular/core';

import { User } from '../user';
import { Allergy } from '../allergy';
import { AccountService } from '../account.service';
import { AllergyService } from '../allergy.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  allergies: Allergy[] = new Array<Allergy>();
  userAllergies: Allergy[] = new Array<Allergy>();
  isUserLoaded: boolean = false;

  constructor(private accountService: AccountService, private allergyService: AllergyService) { }

  ngOnInit() {
    /* TODO: how to implement a find by ID without exposing user record */
    this.getUserById('5cbd80267e97260c2f7771bb');
    this.getAllergyList();
    this.isUserLoaded = true; // this is not a fix must wait for get response before rendering profile page
  }

  drop(event: CdkDragDrop<Allergy[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  getUserById(id: string): void {
    this.accountService.getUserById(id)
    .subscribe((res: User) => {
      this.user = res;
      console.log(res);
    });
  }

  getDietList(): void {
  }

  getAllergyList(): void {
    this.allergyService.getAllergyList()
    .subscribe((res: Allergy[]) => {
      res.forEach((item) => {
        var allergy = new Allergy();
        allergy.type = item.type;
        this.allergies.push(allergy);
        allergy = null;
      })
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
