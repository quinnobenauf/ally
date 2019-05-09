import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { User } from '../interfaces/user';
import { Allergy } from '../interfaces/allergy';
import { Diet } from '../interfaces/diet';
import { UserService } from '../services/user.service';
import { AllergyService } from '../services/allergy.service';
import { DietService } from '../services/diet.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  allergies: Allergy[] = new Array<Allergy>();
  diets: Diet[] = new Array<Diet>();
  isUserLoaded: boolean = false;

  constructor(private accountService: UserService,
              private allergyService: AllergyService,
              private dietService: DietService) { }

  ngOnInit() {
    // fetch user data then fetch allergy list
    this.accountService.getUserById('5ccbab4cb16cb8a673f90b61').subscribe((user) => {
      this.user = user;
      this.getAllergyList(this.user._id);
      this.getDietList(this.user._id);
      this.isUserLoaded = true;
    });
  }

  // update user profile (restrictions)
  updateProfile(): void {
    this.accountService.modifyUser(this.user._id, this.user)
    .subscribe((res: User) => {
      // reload component?
      console.log(res);
    });
  }

  // fetch diet list
  getDietList(id: string): void {
    this.dietService.getDietList(id, this.user)
    .subscribe((res: Diet[]) => {
      res.forEach((item) => {
        var diet = new Diet();
        diet.type = item.type;
        diet._id = item._id;
        this.diets.push(diet);
      });
    });
    console.log(this.diets);
  }

  // fetch allergy list
  getAllergyList(id: string) {
    this.allergyService.getAllergyList(id, this.user)
    .subscribe((res: Allergy[]) => {
      res.forEach((item) => {
        var allergy = new Allergy();
        allergy.type = item.type;
        allergy._id = item._id;
        this.allergies.push(allergy);
      });
    });
    console.log(this.allergies);
  }

  // drag & drop cards functionality
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
}

/*  USER IDs
    TODO: how to get ids not generate by mongodb?
    alonzoj:    5ccbab20b16cb8a673f90b5f
    bursteino:  5ccbab5db16cb8a673f90b62
    obenaufq:   5ccbab4cb16cb8a673f90b61
    zoskeb:     5ccbab6bb16cb8a673f90b63
*/