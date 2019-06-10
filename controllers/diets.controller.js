"use strict";
exports.__esModule = true;
var express = require("express");
var diet_model_1 = require("../model/diet.model");
var user_model_1 = require("../model/user.model");
var DietsController = /** @class */ (function () {
    function DietsController() {
        var _this = this;
        this.path = "/diets";
        this.router = express.Router();
        this.diet = diet_model_1["default"];
        this.user = user_model_1["default"];
        this.getAllDiets = function (req, res) {
            _this.diet.find().then(function (diets) {
                res.send(diets);
            });
        };
        this.filterDiets = function (req, res) {
            // get user data fist and then get diets (exluding user diet selections)
            var id = req.params.id;
            var diets = new Array();
            _this.user.findById(id).then(function (r) {
                r.diets.forEach(function (element) {
                    diets.push(element.type);
                });
                var query = { type: { $nin: diets } };
                _this.diet.find(query).then(function (diets) {
                    res.send(diets);
                });
            });
        };
        this.getDietById = function (req, res) {
            var id = req.params.id;
            if (id.length == 24) {
                _this.diet.findById(id).then(function (diet) {
                    res.send(diet);
                });
            }
            else {
                _this.diet.find({ type: id }).then(function (diet) {
                    res.send(diet);
                });
            }
        };
        // private modifyDiet = (req: express.Request, res: express.Response) => {
        //     const id = req.params.id;
        //     const dietData: Diet = req.body;
        //     this.diet.findByIdAndUpdate(id, dietData, { new: true }).then((diet) => {
        //         res.send(diet);
        //     });
        // }
        this.deleteDiet = function (req, res) {
            var id = req.params.id;
            _this.diet.findByIdAndDelete(id).then(function (successResponse) {
                if (successResponse) {
                    res.send(200);
                }
                else {
                    res.send(400);
                }
            });
        };
        this.createDiet = function (req, res) {
            var dietData = req.body;
            var createdDiet = new _this.diet(dietData);
            createdDiet.save().then(function (savedDiet) {
                res.send(savedDiet);
            });
            console.log(dietData);
        };
        this.initializeRoutes();
    }
    DietsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllDiets);
        this.router.get(this.path + "/filter/:id", this.filterDiets);
        this.router.get(this.path + "/:id", this.getDietById);
        // this.router.put(`${this.path}/:id`, this.modifyDiet);
        this.router["delete"](this.path + "/:id", this.deleteDiet);
        this.router.post(this.path, this.createDiet);
    };
    return DietsController;
}());
exports["default"] = DietsController;
