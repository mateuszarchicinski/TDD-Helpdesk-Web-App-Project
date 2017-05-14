/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// Register Controller
module.exports = function (req, res, next) {
    const reqUser = req.body;

    if (!reqUser.firstName || !reqUser.email || !reqUser.password) {
        return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
            message: 'Request body do not have specified properties firstName, email or password.'
        });
    }

    const newUser = new userModel(reqUser);

    newUser.save((err, user) => {
        if (err) {
            return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                message: err.message
            });
        }

        res.status(HTTP_CODES_CONFIG.CREATED).json(user.toJSON());
    });
};
