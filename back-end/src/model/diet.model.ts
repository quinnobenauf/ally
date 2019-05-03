import * as mongoose from 'mongoose';
import Diet from '../interfaces/diet.interface';

const dietSchema = new mongoose.Schema({
    type: String
}, {versionKey: false});

const dietModel = mongoose.model<Diet & mongoose.Document>('Diet', dietSchema);

export default dietModel;