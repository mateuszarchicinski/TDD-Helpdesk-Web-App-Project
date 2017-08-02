// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/token-handler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// LOCAL VARIABLES
const usedTokens = [];


/**
 * @module {Function} Email Verification Controller
 * @description This module is used to email verification of user via received message on email address and clicks on activating link. Available methods: GET <Read>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const emailVerificationCtrl = require('./controllers/email-verification');
 * 
 * app.get('/verification/email', emailVerificationCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/verification/email?token=XXXX.XXXX.XXXX
 */


// Email Verification Controller
module.exports = function (req, res, next) {
    const q = req.query;
    const token = {
        encoded: q.token
    };

    if (!token.encoded || usedTokens.includes(token.encoded)) {
        return res.redirectTo();
    }

    try {
        const decodedToken = tokenHandler.decode(token.encoded);

        token.payload = decodedToken.payload;
        token.isValid = decodedToken.isValid;
    } catch (err) {
        usedTokens.push(token.encoded);

        return next(err);
    }

    if (token.isValid()) {
        userModel.find({
            _id: token.payload.sub,
            email: token.payload.email
        }, [], {
            limit: 1
        }, (err, users) => {
            if (err) {
                return next(err);
            }

            const user = users[0];

            if (user) {
                user.active = true;

                /* eslint-disable */
                user.save((err, user) => {
                    /* eslint-enable */
                    if (err) {
                        return next(err);
                    }

                    usedTokens.push(token.encoded);

                    res.redirectTo();
                });
            } else {
                res.redirectTo();
            }
        });
    } else {
        res.redirectTo();
    }
};
