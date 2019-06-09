"use strict";
exports.__esModule = true;
var express = require("express");
var event_model_1 = require("../model/event.model");
var user_model_1 = require("../model/user.model");
var EventsController = /** @class */ (function () {
    function EventsController() {
        var _this = this;
        this.path = "/events";
        this.router = express.Router();
        this.event = event_model_1["default"];
        this.user = user_model_1["default"];
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
            var eventId = req.params.id;
            _this.event.findById(eventId).then(function (event) {
                res.send(event.guests);
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
    };
    return EventsController;
}());
exports["default"] = EventsController;
