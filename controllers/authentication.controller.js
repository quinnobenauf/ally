"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jwt = require("jsonwebtoken");
var passport = require("passport");
var session = require("express-session");
var googlePassport_middleware_1 = require("../middlewares/googlePassport.middleware");
var user_model_1 = require("../model/user.model");
var UserWithThatEmailAlreadyExistsException_1 = require("../exceptions/UserWithThatEmailAlreadyExistsException");
var WrongCredentialsException_1 = require("../exceptions/WrongCredentialsException");
var createUser_dto_1 = require("../dtos/createUser.dto");
var validation_middleware_1 = require("../middlewares/validation.middleware");
var AuthenticationController = /** @class */ (function () {
    function AuthenticationController() {
        var _this = this;
        this.path = "/auth";
        this.router = express.Router();
        this.user = user_model_1["default"];
        this.register = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var userData, user, tokenData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userData = req.body;
                        return [4 /*yield*/, this.user.findOne({ email: userData.email })];
                    case 1:
                        if (!_a.sent()) return [3 /*break*/, 2];
                        next(new UserWithThatEmailAlreadyExistsException_1["default"](userData.email));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.user.create(__assign({}, userData, { password: userData.password }))];
                    case 3:
                        user = _a.sent();
                        console.log(user);
                        user.password = undefined;
                        tokenData = this.createToken(user);
                        res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                        res.send(user);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.login = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var loginData, user, isPasswordMatching, tokenData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        loginData = req.body;
                        return [4 /*yield*/, this.user.findOne({ email: loginData.email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            isPasswordMatching = loginData.password === user.password;
                            console.log("CHECKING PASSWORDS");
                            if (isPasswordMatching) {
                                console.log("PASSWORD MATCHES?");
                                user.password = undefined;
                                tokenData = this.createToken(user);
                                console.log("MAKE A TOKEN");
                                res.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
                                res.send(user);
                            }
                            else {
                                next(new WrongCredentialsException_1["default"]());
                            }
                        }
                        else {
                            next(new WrongCredentialsException_1["default"]());
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.googlePassport = new googlePassport_middleware_1["default"]();
        this.router.use(session({ secret: "dogs" }));
        this.router.use(passport.initialize());
        this.router.use(passport.session());
        this.initializeRoutes();
    }
    AuthenticationController.prototype.initializeRoutes = function () {
        this.router.get(this.path + "/google", passport.authenticate("google", {
            scope: ["profile", "email"]
        }));
        this.router.get(this.path + "/google/callback", passport.authenticate("google", {
            failureRedirect: "/",
            successRedirect: "/#/dashboard"
        }), function (req, res) {
            console.log("req", req.params.user);
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.send(req.params.user);
        });
        this.router.post(this.path + "/register", validation_middleware_1["default"](createUser_dto_1["default"]), this.register);
        this.router.post(this.path + "/login", this.login);
    };
    AuthenticationController.prototype.createToken = function (user) {
        var expiresIn = 60 * 60; // 1 hour
        var secret = process.env.JWT_SECRET;
        var dataStoredInToken = {
            _id: user._id
        };
        return {
            expiresIn: expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn: expiresIn })
        };
    };
    AuthenticationController.prototype.createCookie = function (tokenData) {
        return "Authorization=" + tokenData.token + "; HttpOnly; Max-Age=" + tokenData.expiresIn;
    };
    return AuthenticationController;
}());
exports["default"] = AuthenticationController;
