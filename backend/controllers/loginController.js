/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


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

        if (users.length === 0) {
            return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                message: 'You are not authorized!'
            });
        }

        const user = users[0];

        user.comparePasswords(reqUser.password, (err, status) => {
            if (err) {
                return next(err);
            }

            if (!status) {
                return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                    message: 'You are not authorized!'
                });
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(user.toJSON());
        });
    });
};