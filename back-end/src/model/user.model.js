"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var allergySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String
});
var dietSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: String
});
var userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: String,
    email: String,
    phone: String,
    allergies: [allergySchema],
    diets: [dietSchema],
    friends: [mongoose.SchemaTypes.ObjectId]
});
// send key: value(type)
var userModel = mongoose.model('User', userSchema);
exports["default"] = userModel;
