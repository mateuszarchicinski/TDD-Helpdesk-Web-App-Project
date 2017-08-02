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
 * @module {Function} Facebook Controller
 * @description This module is used to user login via facebook. Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const facebookCtrl = require('./controllers/facebook');
 * 
 * app.post('/facebook', facebookCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/facebook
 */


// Facebook Controller
module.exports = function (req, res, next) {
    if (!req.body.code || !req.body.clientId || !req.body.redirectUri) {
        return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
            message: 'Request body do not have specified properties code, clientId or redirectUri.'
        });
    }

    const accessTokenUrl = 'https://graph.facebook.com/v2.5/oauth/access_token';
    const fields = ['first_name', 'last_name', 'name', 'gender', 'picture', 'email', 'verified', 'locale', 'id'];
    const facebookApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
    const urlParams = {
        code: req.body.code,
        client_id: req.body.clientId,
        client_secret: APP_CONFIG.AUTH.FACEBOOK.SECRET,
        redirect_uri: req.body.redirectUri
    };

    request.get({
        url: accessTokenUrl,
        qs: urlParams,
        json: true
    }, (error, response, accessToken) => {
        if (accessToken.error) {
            return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                message: accessToken.error.message
            });
        }

        request.get({
            url: facebookApiUrl,
            qs: accessToken,
            json: true
        }, (error, response, facebookUser) => {
            if (facebookUser.error) {
                return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                    message: facebookUser.error.message
                });
            }

            userModel.find({
                email: facebookUser.email
            }, [], {
                limit: 1
            }, (err, users) => {
                if (err) {
                    return next(err);
                }

                const user = users[0];
                let newToken;

                if (user) {
                    user.lastName = user.lastName || facebookUser.last_name;
                    user.fullName = user.fullName || facebookUser.name;
                    user.gender = user.gender || facebookUser.gender;

                    if (!user.pictures.includes(facebookUser.picture.data.url)) {
                        user.pictures.push(facebookUser.picture.data.url);
                    }

                    if (!user.active && user.active !== facebookUser.verified) {
                        user.active = facebookUser.verified;
                    }

                    user.locale = user.locale || facebookUser.locale.split('_')[0];
                    user.facebookId = user.facebookId || facebookUser.id;

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
                        firstName: facebookUser.first_name,
                        lastName: facebookUser.last_name,
                        fullName: facebookUser.name,
                        gender: facebookUser.gender,
                        pictures: [facebookUser.picture.data.url],
                        email: facebookUser.email,
                        isPassword: false,
                        active: facebookUser.verified,
                        locale: facebookUser.locale.split('_')[0],
                        facebookId: facebookUser.id
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
