import * as mongoose from "mongoose";
import Event from "../interfaces/event.interface";

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  type: String
});

const eventSchema = new mongoose.Schema(
  {
    title: String,
    host: String,
    guests: [userSchema],
    date: String,
    location: String
  },
  { versionKey: false }
);

const eventModel = mongoose.model<Event & mongoose.Document>("Event", eventSchema);

export default eventModel;
