import { Allergy }  from './allergy';

export class User {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    allergies: Allergy[] = new Array<Allergy>();
}
