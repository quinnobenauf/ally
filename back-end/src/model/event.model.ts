import * as mongoose from "mongoose";
import Event from "../interfaces/event.interface";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    host: String,
    guests: [mongoose.Schema.Types.ObjectId],
    date: String,
    location: String
  },
  { versionKey: false }
);

const eventModel = mongoose.model<Event & mongoose.Document>("Event", eventSchema);

export default eventModel;
