/* eslint no-unused-vars: ["error", { "args": "none" }] */


/*!
 *
 * ensureAuthentication Middleware
 *
 * Descripton:
 * - 
 *
 * Usage:
 * - 
 *
 */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/tokenHandler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


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
            req.user = user.toJSON();
            req.user.token = token.encoded;

            next();
        } else {
            if (user.isActiveToken(token.encoded)) {
                user.removeToken(token.encoded);

                user.save((err, user) => {
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
