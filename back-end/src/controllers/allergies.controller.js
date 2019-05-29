"use strict";
exports.__esModule = true;
var express = require("express");
var allergy_model_1 = require("../model/allergy.model");
var user_model_1 = require("../model/user.model");
var AllergiesController = /** @class */ (function () {
    function AllergiesController() {
        var _this = this;
        this.path = '/allergies';
        this.router = express.Router();
        this.allergy = allergy_model_1["default"];
        this.user = user_model_1["default"];
        this.getAllAllergies = function (req, res) {
            _this.allergy.find().then(function (allergies) {
                res.send(allergies);
            });
        };
        this.filterAllergies = function (req, res) {
            // get user data first and then get allergies (excluding user allergies!)
            var id = req.params.id;
            var allergies = new Array();
            _this.user.findById(id).then(function (r) {
                r.allergies.forEach(function (element) {
                    allergies.push(element.type);
                    // console.log(allergies);
                });
                var query = { 'type': { '$nin': allergies } };
                _this.allergy.find(query).then(function (allergies) {
                    res.send(allergies);
                });
            });
            // let query = {"type": {"$nin": allergies}};
            // console.log(query);
            // this.allergy.find(query).then((allergies) => {
            //     res.send(allergies);
            // });
        };
        this.getAllergyById = function (req, res) {
            var id = req.params.id;
            if (id.length == 24) {
                _this.allergy.findById(id).then(function (allergy) {
                    res.send(allergy);
                });
            }
            else {
                _this.allergy.find({ 'type': id }).then(function (allergy) {
                    res.send(allergy);
                });
            }
        };
        // private modifyAllergy = (req: express.Request, res: express.Response) => {
        //     const id = req.params.id;
        //     const allergyData: Allergy = req.body;
        //     this.allergy.findByIdAndUpdate(id, allergyData, { new: true }).then((allergy) => {
        //         res.send(allergy);
        //     });
        // }
        this.deleteAllergy = function (req, res) {
            var id = req.params.id;
            _this.allergy.findByIdAndDelete(id).then(function (successResponse) {
                if (successResponse) {
                    res.send(200);
                }
                else {
                    res.send(400);
                }
            });
        };
        this.createAllergy = function (req, res) {
            var allergyData = req.body;
            var createdAllergy = new _this.allergy(allergyData);
            createdAllergy.save().then(function (savedAllergy) {
                res.send(savedAllergy);
            });
            console.log(allergyData);
        };
        this.initializeRoutes();
    }
    AllergiesController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllAllergies);
        this.router.get(this.path + "/filter/:id", this.filterAllergies);
        this.router.get(this.path + "/:id", this.getAllergyById);
        // this.router.put(`${this.path}/:id`, this.modifyAllergy);
        this.router["delete"](this.path + "/:id", this.deleteAllergy);
        this.router.post(this.path, this.createAllergy);
    };
    return AllergiesController;
}());
exports["default"] = AllergiesController;
