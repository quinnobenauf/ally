import Allergy from './allergy.interface';

interface User {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    email: string;
    phone: string;
    allergies: Allergy[];
}

export default User;