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
    this.getUserById('5cc8c0423d80bd59b7c1217d');
    this.getAllergyList();
    this.isUserLoaded = true; // this is not a fix must wait for get response before rendering profile page
  }

  updateProfile(): void {
    console.log(this.user);
    this.accountService.modifyUser('5cc8c0423d80bd59b7c1217d', this.user)
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
    this.allergyService.getAllergyList()
    .subscribe((res: Allergy[]) => {
      res.forEach((item) => {
        var allergy = new Allergy();
        allergy.type = item.type;
        allergy._id = item._id;
        let allergyExists: boolean = false;
        this.user.allergies.forEach((userAllergy) => {
          if (userAllergy._id === allergy._id) {
            allergyExists = true;
          }
        })
        if (!allergyExists) {
          console.log(this.user.allergies.entries);
          this.allergies.push(allergy);
          return;
        }
      })
    });
  }

}

/*  USER IDs
    TODO: how to get ids not generate by mongodb?
    alonzoj:    5cc8c0423d80bd59b7c1217d
    bursteino:  5cbd803e7e97260c2f7771bd
    obenaufq:   5cbd80267e97260c2f7771bb
    zoskeb:     5cbd80347e97260c2f7771bc
*/
