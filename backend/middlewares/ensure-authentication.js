// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/token-handler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


/**
 * @module {Function} Ensure Authentication Middleware
 * @description This module provides ensure authentication functionality of user. Only an appropriate users will have access to requested resources.
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const ensureAuthentication = require('./middlewares/ensure-authentication');
 * const userCtrl = require('./controllers/user');
 *
 * app.get('/user/:_id', ensureAuthentication, userCtrl);
 *
 * app.listen(3000, 'localhost'); // http://localhost:3000/user/{_id}
 */


// Ensure Authentication Middleware
module.exports = function (req, res, next) {
    const authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) {
        return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
            message: 'Please make sure your request has an Authorization header.'
        });
    }

    const token = {
        encoded: authorizationHeader.split(' ')[1]
    };

    try {
        const decodedToken = tokenHandler.decode(token.encoded);

        token.payload = decodedToken.payload;
        token.isValid = decodedToken.isValid;
    } catch (err) {
        return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
            message: err.message
        });
    }

    if (token.payload.device !== req.headers['user-agent']) {
        return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
            message: 'You are not authorized!'
        });
    }

    userModel.find({
        _id: token.payload.sub,
        email: token.payload.email
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

        if (token.isValid() && user.isActiveToken(token.encoded)) {
            req.user = user;
            req.user.token = token.encoded;

            next();
        } else {
            if (user.isActiveToken(token.encoded)) {
                user.removeToken(token.encoded);

                /* eslint-disable */
                user.save((err, user) => {
                    /* eslint-enable */
                    if (err) {
                        if (err.name === 'ValidationError') {
                            return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                                message: err.message
                            });
                        }

                        return next(err);
                    }

                    return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                        message: 'Your token has expired.'
                    });
                });
            } else {
                return res.status(HTTP_CODES_CONFIG.UNAUTHORIZED).json({
                    message: 'Your token has expired.'
                });
            }
        }
    });
};
