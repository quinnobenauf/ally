import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { User } from '../../interfaces/user';
import { Allergy } from '../../interfaces/allergy';
import { Diet } from '../../interfaces/diet';
import { UserService } from '../../services/user.service';
import { AllergyService } from '../../services/allergy.service';
import { DietService } from '../../services/diet.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  userSub: Subscription;
  allergies: Allergy[] = new Array<Allergy>();
  diets: Diet[] = new Array<Diet>();
  friends: User[] = new Array<User>();
  isUserLoaded: boolean = false;
  

  constructor(private accountService: UserService,
              private allergyService: AllergyService,
              private dietService: DietService,
              private authService: AuthService) { }

  ngOnInit() {

    // fetch user data then fetch allergy list
      this.user = JSON.parse(sessionStorage.getItem('currentUser'));
      this.accountService.getUserById(this.user._id).subscribe((user) => {
        this.user = user;
        this.getAllergyList(this.user._id);
        this.getDietList(this.user._id);
        this.getFriendsList(this.user._id);
        this.isUserLoaded = true;
      });

    }

  addFriend(): void {
    var userName = (document.getElementById(
      "userNameSearch"
    ) as HTMLInputElement).value;
    if (userName != "") {
      var user = this.accountService
        .getUserById(userName)
        .subscribe((user: User) => {
          this.friends.push(user);
          this.user.friends = this.friends;
          console.log("THIS.FRIENDS ADDFRIEND(): ", this.user.friends);
          this.updateProfile();
        });
    }
  }

  // update user profile (restrictions)
  updateProfile(): void {
    console.log("THIS.FRIENDS UPDATING: ", this.user.friends);
    this.validateUpdateFields();

    this.accountService
      .modifyUser(this.user._id, this.user)
      .subscribe((res: User) => {
        this.accountService.getUserById(this.user._id).subscribe((user) => {
          this.user = user;
          
        })
      });
        // sessionStorage.setItem('currentUser', JSON.stringify(this.user));
  }

  validateUpdateFields(): void {
    if (
      (document.getElementById("firstName") as HTMLInputElement).value != ""
    ) {
      this.user.firstName = (document.getElementById(
        "firstName"
      ) as HTMLInputElement).value;
    }
    if ((document.getElementById("lastName") as HTMLInputElement).value != "") {
      this.user.lastName = (document.getElementById(
        "lastName"
      ) as HTMLInputElement).value;
    }
    if ((document.getElementById("userName") as HTMLInputElement).value != "") {
      this.user.userName = (document.getElementById(
        "userName"
      ) as HTMLInputElement).value;
    }
    // if ((document.getElementById("password") as HTMLInputElement).value != "") {
    //   this.user.password = (document.getElementById(
    //     "password"
    //   ) as HTMLInputElement).value;
    // }
    if ((document.getElementById("email") as HTMLInputElement).value != "") {
      this.user.email = (document.getElementById(
        "email"
      ) as HTMLInputElement).value;
    }
    if ((document.getElementById("phone") as HTMLInputElement).value != "") {
      this.user.phone = (document.getElementById(
        "phone"
      ) as HTMLInputElement).value;
    }
  }

  // fetch diet list
  getDietList(id: string): void {
    this.dietService.getDietList(id, this.user).subscribe((res: Diet[]) => {
      res.forEach(item => {
        var diet = new Diet();
        diet.type = item.type;
        diet._id = item._id;
        this.diets.push(diet);
      });
    });
    console.log("DIETS " + this.diets);
  }

  // fetch allergy list
  getAllergyList(id: string) {
    this.allergyService
      .getAllergyList(id, this.user)
      .subscribe((res: Allergy[]) => {
        res.forEach(item => {
          var allergy = new Allergy();
          allergy.type = item.type;
          allergy._id = item._id;
          this.allergies.push(allergy);
        });
      });
    console.log(this.allergies);
  }

  // fetch friends list
  getFriendsList(id: string) {
    this.accountService.getFriendsList(id).subscribe((res: User[]) => {
      res.forEach(friend => {
        this.friends.push(friend);
        console.log("FRIEND: ", friend.firstName);
      });
    });
  }

  // drag & drop cards functionality
  drop(event: CdkDragDrop<Allergy[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
