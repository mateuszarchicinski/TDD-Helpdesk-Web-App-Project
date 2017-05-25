/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// Logout Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    userModel.find({
        _id: reqUser._id,
        email: reqUser.email
    }, [], {
        limit: 1
    }, (err, users) => {
        if (err) {
            return next(err);
        }

        const user = users[0];

        if (!user) {
            return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                message: 'User not found.'
            });
        }

        user.removeToken(reqUser.token);

        user.save((err, user) => {
            res.status(HTTP_CODES_CONFIG.SUCCESS).end();
        });
    });
};
