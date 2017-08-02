// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} Users Controller
 * @description This module provides users resources. Only users with high permissions have access to that resources. Available method: GET <Read>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const usersCtrl = require('./controllers/users');
 * 
 * app.get('/users', usersCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/users
 */


// Users Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    if (reqUser.role === 'user') {
        return res.status(HTTP_CODES_CONFIG.FORBIDDEN).json({
            /* eslint-disable */
            message: "You dont't have permissions to access this resource!"
            /* eslint-enable */
        });
    }

    userModel.find({}, (err, users) => {
        if (err) {
            return next(err);
        }

        res.status(HTTP_CODES_CONFIG.SUCCESS).json(users);
    });
};
