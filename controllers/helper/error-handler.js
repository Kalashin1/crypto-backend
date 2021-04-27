"use strict";
exports.__esModule = true;
function errorHandler(err) {
    var errors = { email: '', password: '', name: '' };
    if (err.message.includes('incorrect email')) {
        errors.email = 'no user exists with that email';
    }
    if (err.message.includes('incorrect password')) {
        errors.password = 'incorrect password please try another password';
    }
    if (err.code === 11000) {
        errors['email'] = 'that email already exists, try another email';
        return errors;
    }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(function (_a) {
            var properties = _a.properties;
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}
exports["default"] = errorHandler;
