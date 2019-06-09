"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String
});
var eventSchema = new mongoose.Schema({
    title: String,
    host: String,
    guests: [userSchema],
    date: String,
    location: String
}, { versionKey: false });
var eventModel = mongoose.model("Event", eventSchema);
exports["default"] = eventModel;
