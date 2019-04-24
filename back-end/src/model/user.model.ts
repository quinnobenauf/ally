import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';
import Allergy from '../interfaces/allergy.interface';
import Diet from '../interfaces/diet.interface';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    allergies: [String],
    diets: [String]
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;