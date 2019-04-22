import * as mongoose from 'mongoose';
import User from '../interfaces/user.interface';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;