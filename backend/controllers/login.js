// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/token-handler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} Login Controller
 * @description This module is used to user login. Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const loginCtrl = require('./controllers/login');
 * 
 * app.get('/login', loginCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/login
 */


// Login Controller
module.exports = function (req, res, next) {
    const reqUser = req.body;

    if (!reqUser.email || !reqUser.password) {
        return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
            message: 'Request body do not have specified properties email or password.'
        });
    }

    userModel.find({
        email: reqUser.email
    }, [], {
        limit: 1
    }, (err, users) => {
        if (err) {
            return next(err);
        }

        const user = users[0];

        if (!user || !user.isPassword) {
            return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                message: 'You are not authorized!'
            });
        }

        user.comparePasswords(reqUser.password, (err, status) => {
            if (err) {
                return next(err);
            }

            if (!status) {
                return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                    message: 'You are not authorized!'
                });
            }

            const newToken = tokenHandler.encode({
                sub: user._id,
                email: user.email,
                device: req.headers['user-agent']
            });

            user.active_tokens.push(newToken);

            user.save((err, user) => {
                if (err) {
                    if (err.name === 'ValidationError') {
                        return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                            message: err.message
                        });
                    }

                    return next(err);
                }

                const loggedUser = user.toJSON();
                loggedUser.token = newToken;

                res.status(HTTP_CODES_CONFIG.SUCCESS).json(loggedUser);
            });
        });
    });
};
