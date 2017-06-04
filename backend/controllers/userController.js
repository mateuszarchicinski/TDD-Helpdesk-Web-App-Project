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

    // METHOD: GET / READ
    if (req.method === 'GET') {
        if (req.params.id) {
            userModel.find({
                _id: req.params.id
            }, [], {
                limit: 1
            }, (err, users) => {
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.SUCCESS).json(users[0].toJSON());
            });
        } else {
            res.status(HTTP_CODES_CONFIG.SUCCESS).json(reqUser.toJSON());
        }
    }

    // METHOD: PUT / UPDATE
    if (req.method === 'PUT') {
        Object.keys(req.body).forEach((key) => {
            if (reqUser[key] !== req.body[key]) {
                reqUser[key] = req.body[key];
            }
        });

        reqUser.save((err, user) => {
            if (err) {
                return next(err);
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(user.toJSON());
        });
    }

    // METHOD: DELETE
    if (req.method === 'DELETE') {
        reqUser.remove((err, user) => {
            res.status(HTTP_CODES_CONFIG.SUCCESS).end();
        });
    }
};
