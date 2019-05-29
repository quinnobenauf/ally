import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

import { User } from "../interfaces/user";
import { Allergy } from "../interfaces/allergy";
import { Diet } from "../interfaces/diet";
import { UserService } from "../services/user.service";
import { AllergyService } from "../services/allergy.service";
import { DietService } from "../services/diet.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user: User = new User();
  allergies: Allergy[] = new Array<Allergy>();
  diets: Diet[] = new Array<Diet>();
  friends: User[] = new Array<User>();
  isUserLoaded: boolean = false;

  constructor(
    private accountService: UserService,
    private allergyService: AllergyService,
    private dietService: DietService
  ) {}

  ngOnInit() {
    // fetch user data then fetch allergy list
    this.accountService
      .getUserById("5ccbab4cb16cb8a673f90b61")
      .subscribe(user => {
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
        // reload component?
      });
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
    if ((document.getElementById("password") as HTMLInputElement).value != "") {
      this.user.password = (document.getElementById(
        "password"
      ) as HTMLInputElement).value;
    }
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

/*  USER IDs
    TODO: how to get ids not generate by mongodb?
    alonzoj:    5ccbab20b16cb8a673f90b5f
    bursteino:  5ccbab5db16cb8a673f90b62
    obenaufq:   5ccbab4cb16cb8a673f90b61
    zoskeb:     5ccbab6bb16cb8a673f90b63
*/
