"use strict";
exports.__esModule = true;
function errorMiddleware(err, req, res, next) {
    var status = err.status || 500;
    var message = err.message || 'Something went wrong';
    res.status(status).send({
        status: status, message: message
    });
}
exports["default"] = errorMiddleware;
