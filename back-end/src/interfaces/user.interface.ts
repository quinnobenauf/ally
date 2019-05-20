import Allergy from './allergy.interface';
import Diet from './diet.interface';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phone: string;
    allergies: Allergy[];
    diets: Diet[];
    friends: [string];
}

export default User;