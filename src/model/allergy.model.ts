import * as mongoose from 'mongoose';
import Allergy from '../interfaces/allergy.interface';

const allergySchema = new mongoose.Schema({
    type: String,
}, {versionKey: false});

const allergyModel = mongoose.model<Allergy & mongoose.Document>('Allergy', allergySchema);

export default allergyModel;