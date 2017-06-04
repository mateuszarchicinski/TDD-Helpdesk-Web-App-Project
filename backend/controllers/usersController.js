/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// Users Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    userModel.find({}, (err, users) => {
        res.status(HTTP_CODES_CONFIG.SUCCESS).json(users);
    });
};
