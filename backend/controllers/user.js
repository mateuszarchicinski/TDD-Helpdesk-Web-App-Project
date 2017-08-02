// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} User Controller
 * @description This module provides user resource. Only an appropriate user has access to that resources. Available methods: GET <Read> /{_id} | PUT <Update> /{_id} | DELETE /{_id}
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const userCtrl = require('./controllers/user');
 * 
 * app.get('/user/:_id', userCtrl);
 * app.put('/user/:_id', userCtrl);
 * app.delete('/user/:_id', userCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/user/{_id}
 */


// User Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    // METHOD: GET / READ
    if (req.method === 'GET') {
        if (!req.params._id) {
            return res.status(HTTP_CODES_CONFIG.SUCCESS).json(reqUser.toJSON());
        }


        userModel.findById(req.params._id, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                    message: 'The resource not found!'
                });
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(user.toJSON());
        });
    }

    // METHOD: PUT / UPDATE
    if (req.method === 'PUT') {
        userModel.findByIdAndUpdate(req.params._id, req.body, {
            new: true
        }, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                    message: 'The resource not found!'
                });
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(user.toJSON());
        });
    }

    // METHOD: DELETE
    if (req.method === 'DELETE') {
        userModel.findByIdAndRemove(req.params._id, (err, user) => {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                    message: 'The resource not found!'
                });
            }

            res.status(HTTP_CODES_CONFIG.DELETED).end();
        });
    }
};
