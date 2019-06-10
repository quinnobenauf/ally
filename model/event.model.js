"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    title: String,
    host: String,
    guests: [mongoose.Schema.Types.ObjectId],
    date: String,
    location: String
}, { versionKey: false });
var eventModel = mongoose.model("Event", eventSchema);
exports["default"] = eventModel;
