"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var HttpException_1 = require("./HttpException");
var UserWithThatEmailAlreadyExistsException = /** @class */ (function (_super) {
    __extends(UserWithThatEmailAlreadyExistsException, _super);
    function UserWithThatEmailAlreadyExistsException(email) {
        return _super.call(this, 404, 'User with that email already exists') || this;
    }
    return UserWithThatEmailAlreadyExistsException;
}(HttpException_1["default"]));
exports["default"] = UserWithThatEmailAlreadyExistsException;
