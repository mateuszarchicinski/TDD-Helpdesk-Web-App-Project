// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const alertHandler = require('../services/alertHandler');
const mongoose = require('../services/mongoose');
const sendMail = require('../services/sendMail');
const tokenHandler = require('../services/tokenHandler');


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
            if (err.name === 'ValidationError') {
                return res.status(HTTP_CODES_CONFIG.BAD_REQUEST).json({
                    message: err.message
                });
            }

            return next(err);
        }

        sendMail(user, {
            type: 'verificationEmail',
            redirectUri: req.createFullUrl()
        }).catch((err) => {
            alertHandler('error', err);
        });

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
