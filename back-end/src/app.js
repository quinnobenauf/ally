"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var App = /** @class */ (function () {
    function App(controllers) {
        this.app = express();
        this.connectToDB();
        this.initializeMiddlewares();
        this.mountControllers(controllers);
    }
    App.prototype.initializeMiddlewares = function () {
        this.app.use(bodyParser.json());
        this.app.use(cors());
    };
    App.prototype.mountControllers = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.connectToDB = function () {
        var _a = process.env, MONGO_USER = _a.MONGO_USER, MONGO_PASSWORD = _a.MONGO_PASSWORD, MONGO_PATH = _a.MONGO_PATH;
        mongoose.connect("mongodb+srv://" + MONGO_USER + ":" + MONGO_PASSWORD + MONGO_PATH, { useNewUrlParser: true }).then(function () {
            console.log("connected to db");
        });
        // mongoose.connect('mongodb://localhost:3000/ally').then(() => { 
        //     console.log('connected to db');
        // });
    };
    App.prototype.listen = function () {
        this.app.listen(process.env.PORT, function () {
            console.log("Listening on port " + process.env.PORT);
        });
    };
    return App;
}());
exports["default"] = App;
