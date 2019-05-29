"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var dietSchema = new mongoose.Schema({
    type: String
}, { versionKey: false });
var dietModel = mongoose.model('Diet', dietSchema);
exports["default"] = dietModel;
