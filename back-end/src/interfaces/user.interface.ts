import Allergy from './allergy.interface';
import Diet from './diet.interface';

interface User {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phone: string;
    allergies: Allergy[];
    diets: Diet[];
}

export default User;