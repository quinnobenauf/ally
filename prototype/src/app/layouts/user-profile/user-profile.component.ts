import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { User } from '../../interfaces/user';
import { Allergy } from '../../interfaces/allergy';
import { Diet } from '../../interfaces/diet';
import { UserService } from '../../services/user.service';
import { AllergyService } from '../../services/allergy.service';
import { DietService } from '../../services/diet.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  userSub: Subscription;
  allergies: Allergy[] = new Array<Allergy>();
  diets: Diet[] = new Array<Diet>();
  isUserLoaded: boolean = false;
  

  constructor(private accountService: UserService,
              private allergyService: AllergyService,
              private dietService: DietService,
              private authService: AuthService) { }

  ngOnInit() {
    // fetch user data then fetch allergy list
    // this.accountService.getUserById(currUser[]).subscribe((user) => {
      this.userSub = this.authService.currentUser.subscribe(user => {
        this.user = user;
      });
      console.log(this.user);
      this.getAllergyList(this.user._id);
      this.getDietList(this.user._id);
      this.isUserLoaded = true;
    // });
  }

  // update user profile (restrictions)
  updateProfile(): void {
    console.log(this.user)
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