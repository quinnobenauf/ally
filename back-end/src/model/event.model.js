"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String
});
var eventSchema = new mongoose.Schema({
    title: String,
    host: userSchema,
    invited: [userSchema],
    guests: [userSchema],
    date: Date,
    location: String
}, { versionKey: false });
var eventModel = mongoose.model("Event", eventSchema);
exports["default"] = eventModel;
