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
  user: User = new User();
  allergies: Allergy[] = new Array<Allergy>();
  isUserLoaded: boolean = false;

  constructor(private accountService: AccountService, private allergyService: AllergyService) { }

  ngOnInit() {
    /* TODO: how to implement a find by ID without exposing user record */
    this.getUserById('5ccbab6bb16cb8a673f90b63');
    this.getAllergyList();
    this.isUserLoaded = true; // this is not a fix must wait for get response before rendering profile page
  }

  updateProfile(): void {
    console.log(this.user);
    this.accountService.modifyUser('5ccbab6bb16cb8a673f90b63', this.user)
    .subscribe((res: User) => {
      console.log(res);
    });
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

  isSelected(allergy: Allergy): Boolean {
    this.user.allergies.forEach(element => {
      if(allergy.type === element.type) {
        return true;
      }
    })
    return false;
  }

  getUserById(id: string): void {
    this.accountService.getUserById(id)
    .subscribe((res: User) => {
      this.user = res;
      console.log(res.allergies);
    });
  }

  getDietList(): void {
  }

  getAllergyList() {
    this.allergyService.getAllergyList('5ccbab6bb16cb8a673f90b63', this.user)
    .subscribe((res: Allergy[]) => {
      res.forEach((item) => {
        var allergy = new Allergy();
        allergy.type = item.type;
        allergy._id = item._id;
        this.allergies.push(allergy);
      })
    });
  }

}

/*  USER IDs
    TODO: how to get ids not generate by mongodb?
    alonzoj:    5ccbab20b16cb8a673f90b5f
    bursteino:  5ccbab5db16cb8a673f90b62
    obenaufq:   5ccbab4cb16cb8a673f90b61
    zoskeb:     5ccbab6bb16cb8a673f90b63
*/
