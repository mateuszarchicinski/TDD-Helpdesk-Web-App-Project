// NODE MODULES
const request = require('request');


// APP CONFIG
const APP_CONFIG = require('../app.config');
const HTTP_CODES_CONFIG = APP_CONFIG.HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/token-handler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} Google Controller
 * @description This module is used to user login via google.Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const googleCtrl = require('./controllers/google');
 * 
 * app.post('/google', googleCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/google
 */


// Google Controller
module.exports = function (req, res, next) {
    if (!req.body.code || !req.body.clientId || !req.body.redirectUri) {
        return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
            message: 'Request body do not have specified properties code, clientId or redirectUri.'
        });
    }

    const accessTokenUrl = 'https://accounts.google.com/o/oauth2/token';
    const googleApiUrl = 'https://www.googleapis.com/plus/v1/people/me/openIdConnect';
    const urlParams = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: APP_CONFIG.AUTH.GOOGLE.SECRET,
        redirect_uri: req.body.redirectUri,
        grant_type: 'authorization_code'
    };

    request.post({
        url: accessTokenUrl,
        form: urlParams,
        json: true
    }, (error, response, accessToken) => {
        if (accessToken.error) {
            return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                message: accessToken.error
            });
        }

        const reqHeaders = {
            Authorization: accessToken.token_type + ' ' + accessToken.access_token
        };

        request.get({
            url: googleApiUrl,
            headers: reqHeaders,
            json: true
        }, (error, response, googleUser) => {
            if (googleUser.error) {
                return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                    message: googleUser.error.message
                });
            }

            userModel.find({
                email: googleUser.email
            }, [], {
                limit: 1
            }, (err, users) => {
                if (err) {
                    return next(err);
                }

                const user = users[0];
                let newToken;

                if (user) {
                    user.lastName = user.lastName || googleUser.family_name;
                    user.fullName = user.fullName || googleUser.name;
                    user.gender = user.gender || googleUser.gender;

                    if (!user.pictures.includes(googleUser.picture)) {
                        user.pictures.push(googleUser.picture);
                    }

                    if (!user.active && user.active !== googleUser.email_verified) {
                        user.active = googleUser.email_verified;
                    }

                    user.locale = user.locale || googleUser.locale;
                    user.googleId = user.googleId || googleUser.sub;

                    newToken = tokenHandler.encode({
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
                } else {
                    const newUser = new userModel({
                        firstName: googleUser.given_name,
                        lastName: googleUser.family_name,
                        fullName: googleUser.name,
                        gender: googleUser.gender,
                        pictures: [googleUser.picture],
                        email: googleUser.email,
                        isPassword: false,
                        active: googleUser.email_verified,
                        locale: googleUser.locale,
                        googleId: googleUser.sub
                    });

                    newUser.save((err, user) => {
                        if (err) {
                            if (err.name === 'ValidationError') {
                                return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                                    message: err.message
                                });
                            }

                            return next(err);
                        }

                        newToken = tokenHandler.encode({
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

                            const registeredUser = user.toJSON();
                            registeredUser.token = newToken;

                            res.status(HTTP_CODES_CONFIG.CREATED).json(registeredUser);
                        });
                    });
                }
            });
        });
    });
};
