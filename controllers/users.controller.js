"use strict";
exports.__esModule = true;
var express = require("express");
var user_model_1 = require("../model/user.model");
var UserNotFoundException_1 = require("../exceptions/UserNotFoundException");
var UsersController = /** @class */ (function () {
    function UsersController() {
        var _this = this;
        this.path = "/users";
        this.router = express.Router();
        this.user = user_model_1["default"];
        this.getAllUsers = function (req, res) {
            _this.user.find().then(function (users) {
                res.send(users);
            });
        };
        this.getFriends = function (req, res) {
            var id = req.params.id;
            _this.user.findById(id).then(function (user) {
                _this.user
                    .find({
                    _id: { $in: user.friends }
                })
                    .then(function (friends) {
                    res.send(friends);
                });
            });
        };
        this.getUserById = function (req, res, next) {
            var id = req.params.id;
            if (id.length == 24) {
                _this.user.findById(id).then(function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        _this.user.find({ 'userName': id }).then(function (user) {
                            if (user) {
                                res.send(user);
                            }
                            else {
                                next(new UserNotFoundException_1["default"](id));
                            }
                        });
                    }
                });
            }
            else {
                _this.user.find({ userName: id }).then(function (user) {
                    if (user) {
                        res.send(user);
                    }
                    else {
                        next(new UserNotFoundException_1["default"](id));
                    }
                });
            }
        };
        this.modifyUser = function (req, res) {
            var id = req.params.id;
            var userData = req.body;
            _this.user
                .updateOne({ _id: id }, {
                $set: {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    userName: userData.userName,
                    password: userData.password,
                    email: userData.email,
                    phone: userData.phone,
                    allergies: userData.allergies,
                    diets: userData.diets,
                    friends: userData.friends
                }
            })
                .then(function (user) {
                if (user) {
                    res.send(200);
                }
                else {
                    res.send(400);
                }
            });
        };
        this.deleteUser = function (req, res, next) {
            var id = req.params.id;
            _this.user.findByIdAndDelete(id).then(function (successResponse) {
                if (successResponse) {
                    res.send(200);
                }
                else {
                    next(new UserNotFoundException_1["default"](id));
                }
            });
        };
        this.initializeRoutes();
    }
    UsersController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllUsers);
        this.router.get(this.path + "/:id", this.getUserById);
        this.router.put(this.path + "/:id", this.modifyUser);
        this.router["delete"](this.path + "/:id", this.deleteUser);
        this.router.get(this.path + "/:id/friends", this.getFriends);
    };
    return UsersController;
}());
exports["default"] = UsersController;
