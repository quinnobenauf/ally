import { Allergy } from "./allergy";
import { Diet } from "./diet";

export class User {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phone: string;
  allergies: Allergy[] = new Array<Allergy>();
  diets: Diet[] = new Array<Diet>();
  friends: User[] = new Array<User>();
}

