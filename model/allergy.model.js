"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var allergySchema = new mongoose.Schema({
    type: String
}, { versionKey: false });
var allergyModel = mongoose.model('Allergy', allergySchema);
exports["default"] = allergyModel;
