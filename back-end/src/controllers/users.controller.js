"use strict";
exports.__esModule = true;
var express = require("express");
var user_model_1 = require("../model/user.model");
var UsersController = /** @class */ (function () {
    function UsersController() {
        var _this = this;
        this.path = '/users';
        this.router = express.Router();
        this.user = user_model_1["default"];
        this.getAllUsers = function (req, res) {
            _this.user.find().then(function (users) {
                res.send(users);
            });
        };
        this.getUserById = function (req, res) {
            var id = req.params.id;
            if (id.length == 24) {
                _this.user.findById(id).then(function (user) {
                    res.send(user);
                });
            }
            else {
                _this.user.find({ 'userName': id }).then(function (user) {
                    res.send(user);
                });
            }
        };
        this.modifyUser = function (req, res) {
            var id = req.params.id;
            var userData = req.body;
            _this.user.updateOne({ '_id': id }, { $set: { 'allergies': userData.allergies } }).then(function (user) {
                console.log('allergies');
            });
            _this.user.updateOne({ '_id': id }, { $set: { 'diets': userData.diets } }).then(function (user) {
                console.log('diets');
            });
            // userData.allergies.forEach(element => {
            //     if (!this.user.find().where({$and: [{_id: id}, {allergies: {$in: element}}]})) {
            //         console.log('hi');
            //     }
            //     this.user.updateOne({'_id': id}, {$addToSet: {'allergies': element}}).then((user) => {
            //         console.log("updated allergies!");
            //     });
            // });
            // find element in array within the document
            _this.user.find().where({ $and: [{ fistName: 'Jared' }, { allergies: { $in: { type: 'Peanut' } } }] })
                .exec(function () {
                console.log('found');
            });
        };
        this.deleteUser = function (req, res) {
            var id = req.params.id;
            _this.user.findByIdAndDelete(id).then(function (successResponse) {
                if (successResponse) {
                    res.send(200);
                }
                else {
                    res.send(404);
                }
            });
        };
        this.createUser = function (req, res) {
            var userData = req.body;
            var createdUser = new _this.user(userData);
            createdUser.save().then(function (savedUser) {
                res.send(savedUser);
            });
            console.log(userData);
        };
        this.initializeRoutes();
    }
    UsersController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + "/:id", this.getUserById);
        this.router.put(this.path + "/:id", this.modifyUser);
        this.router["delete"](this.path + "/:id", this.deleteUser);
        this.router.post(this.path, this.createUser);
    };
    return UsersController;
}());
exports["default"] = UsersController;
