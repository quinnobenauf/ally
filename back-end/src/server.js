"use strict";
exports.__esModule = true;
require("dotenv/config");
var app_1 = require("./app");
var users_controller_1 = require("./controllers/users.controller");
var allergies_controller_1 = require("./controllers/allergies.controller");
var diets_controller_1 = require("./controllers/diets.controller");
var events_controller_1 = require("./controllers/events.controller");
var app = new app_1["default"]([
    new users_controller_1["default"](),
    new allergies_controller_1["default"](),
    new diets_controller_1["default"](),
    new events_controller_1["default"]()
]);
app.listen();
