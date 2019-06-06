"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    title: String,
    host: mongoose.Schema.Types.ObjectId,
    invited: [mongoose.Schema.Types.ObjectId],
    guests: [mongoose.Schema.Types.ObjectId],
    date: Date,
    location: String
}, { versionKey: false });
var eventModel = mongoose.model("Event", eventSchema);
exports["default"] = eventModel;
