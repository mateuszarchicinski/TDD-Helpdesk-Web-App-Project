/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// User Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    if (req.method === 'GET') {
        res.status(HTTP_CODES_CONFIG.SUCCESS).json(reqUser);
    }

    if (req.method === 'PUT') {
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

            Object.keys(req.body).forEach((key) => {
                if (user[key] !== req.body[key]) {
                    user[key] = req.body[key];
                }
            });

            user.save((err, user) => {
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.SUCCESS).json(user.toJSON());
            });
        });
    }

    if (req.method === 'DELETE') {
        userModel.findOneAndRemove({
            _id: reqUser._id,
            email: reqUser.email
        }, (err) => {
            if (err) {
                return next(err);
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).end();
        });
    }
};
