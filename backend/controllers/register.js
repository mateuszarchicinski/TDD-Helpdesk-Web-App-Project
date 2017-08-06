// APP CONFIG
const APP_CONFIG = require('../app.config');
const HTTP_CODES_CONFIG = APP_CONFIG.HTTP_CODES_CONFIG;


// APP SERVICES
const mailHandler = require('../services/mail-handler');
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/token-handler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} Register Controller
 * @description This module is used to user registration. Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const registerCtrl = require('./controllers/register');
 * 
 * app.post('/register', registerCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/register
 */


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
            if (err.name === 'ValidationError') {
                return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                    message: err.message
                });
            }

            return next(err);
        }

        /* eslint-disable */
        mailHandler({
            from: `Helpdesk Application <${APP_CONFIG.SMTP.USER}>`,
            type: 'verification_email',
            redirectUri: req.createFullUrl()
        }, user).catch((err) => {});
        /* eslint-enable */

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

            const registeredUser = user.toJSON();
            registeredUser.token = newToken;

            res.status(HTTP_CODES_CONFIG.CREATED).json(registeredUser);
        });
    });
};
