"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var event_model_1 = require("../model/event.model");
var user_model_1 = require("../model/user.model");
var allergy_model_1 = require("../model/allergy.model");
var EventsController = /** @class */ (function () {
    function EventsController() {
        var _this = this;
        this.path = "/events";
        this.router = express.Router();
        this.event = event_model_1["default"];
        this.user = user_model_1["default"];
        this.allergy = allergy_model_1["default"];
        this.allergies = new Array();
        this.getAllEvents = function (req, res) {
            _this.event.find().then(function (events) {
                res.send(events);
            });
        };
        this.getEventById = function (req, res) {
            var id = req.params.id;
            if (id.length == 24) {
                _this.event.findById(id).then(function (event) {
                    res.send(event);
                });
            }
            else {
                _this.event.find({ type: id }).then(function (event) {
                    res.send(event);
                });
            }
        };
        this.getEventsByHost = function (req, res) {
            var id = req.params.id;
            var query = { host: id };
            _this.event.find(query).then(function (events) {
                res.send(events);
            });
        };
        this.modifyEvent = function (req, res) {
            var id = req.params.id;
            var eventData = req.body;
            _this.event
                .updateOne({ _id: id }, {
                $set: {
                    guests: eventData.guests,
                    title: eventData.title,
                    host: eventData.host,
                    date: eventData.date,
                    location: eventData.location
                }
            })
                .then(function (event) {
                if (event) {
                    res.send(200);
                }
                else {
                    res.send(400);
                }
            });
        };
        this.deleteEvent = function (req, res) {
            var id = req.params.id;
            _this.event.findByIdAndDelete(id).then(function (successResponse) {
                if (successResponse) {
                    res.send(200);
                }
                else {
                    res.send(400);
                }
            });
        };
        this.createEvent = function (req, res) {
            var eventData = req.body;
            var createdEvent = new _this.event(eventData);
            createdEvent.save().then(function (savedEvent) {
                res.send(savedEvent);
            });
            console.log(eventData);
        };
        this.getGuestAllergies = function (req, res) {
            var allergies = [];
            var eventId = req.params.id;
            _this.event.findById(eventId).then(function (event) {
                _this.user.find({ _id: { $in: event.guests } }).then(function (guests) {
                    guests.forEach(function (guest) {
                        guest.allergies.forEach(function (allergy) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, allergies.push(allergy)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    });
                    res.send(allergies);
                });
            });
        };
        this.getGuestDiets = function (req, res) {
            var diets = [];
            var eventId = req.params.id;
            _this.event.findById(eventId).then(function (event) {
                _this.user.find({ _id: { $in: event.guests } }).then(function (guests) {
                    guests.forEach(function (guest) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, diets.push(guest.diets)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    res.send(diets);
                });
            });
        };
        this.initializeRoutes();
    }
    EventsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllEvents);
        this.router.get(this.path + "/host/:id", this.getEventsByHost);
        this.router.get(this.path + "/:id", this.getEventById);
        this.router.put(this.path + "/:id", this.modifyEvent);
        this.router["delete"](this.path + "/:id", this.deleteEvent);
        this.router.post(this.path, this.createEvent);
        this.router.get(this.path + "/:id/allergies", this.getGuestAllergies);
        this.router.get(this.path + "/:id/diets", this.getGuestDiets);
    };
    return EventsController;
}());
exports["default"] = EventsController;
