"use strict";
exports.__esModule = true;
var express = require("express");
var event_model_1 = require("../model/event.model");
var user_model_1 = require("../model/user.model");
var EventsController = /** @class */ (function () {
    function EventsController() {
        var _this = this;
        this.path = '/events';
        this.router = express.Router();
        this.event = event_model_1["default"];
        this.user = user_model_1["default"];
        this.getAllEvents = function (req, res) {
            _this.event.find().then(function (events) {
                res.send(events);
            });
        };
        this.filterEvents = function (req, res) {
            // get user data first and then get events (excluding user events!)
            var id = req.params.id;
            var events = new Array();
            _this.user.findById(id).then(function (r) {
                r.events.forEach(function (element) {
                    events.push(element.type);
                });
                var query = { 'type': { '$nin': events } };
                _this.event.find(query).then(function (events) {
                    res.send(events);
                });
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
                _this.event.find({ 'type': id }).then(function (event) {
                    res.send(event);
                });
            }
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
        this.initializeRoutes();
    }
    EventsController.prototype.initializeRoutes = function () {
        this.router.get(this.path, this.getAllEvents);
        this.router.get(this.path + "/filter/:id", this.filterEvents);
        this.router.get(this.path + "/:id", this.getEventById);
        this.router["delete"](this.path + "/:id", this.deleteEvent);
        this.router.post(this.path, this.createEvent);
    };
    return EventsController;
}());
exports["default"] = EventsController;
