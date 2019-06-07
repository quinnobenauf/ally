"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var user_1 = require("../interfaces/user");
var httpOptions = {
    headers: new http_1.HttpHeaders({ "Content-Type": "application/json" })
};
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.authUrl = "/auth";
        this.isLoggedIn = false;
        this.currentUserSubject = new rxjs_1.BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    Object.defineProperty(AuthService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.register = function (user) {
        return this.http.post(this.authUrl + "/register", JSON.stringify(user), httpOptions);
    };
    AuthService.prototype.login = function (email, password) {
        var _this = this;
        console.log("ATTEMPT LOGIN");
        var user = new user_1.User();
        user.email = email;
        user.password = password;
        return this.http
            .post(this.authUrl + "/login", JSON.stringify(user), httpOptions)
            .pipe(operators_1.map(function (res) {
            if (user) {
                sessionStorage.setItem("currentUser", JSON.stringify(res));
                _this.currentUserSubject.next(res);
                _this.isLoggedIn = true;
            }
            return res;
        }));
    };
    AuthService.prototype.logout = function () {
        sessionStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
