/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP SERVICES
const mongoose = require('../services/mongoose');
const tokenHandler = require('../services/tokenHandler');


// APP MODELS
const userModelName = 'User';
const userModel = mongoose.models[userModelName] ? mongoose.model(userModelName) : mongoose.model(userModelName, require('../models/user').schema);


// LOCAL VARIABLES
const usedTokens = [];


// emailVerification Controller
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

                user.save((err, user) => {
                    usedTokens.push(token.encoded);

                    if (err) {
                        return next(err);
                    }

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
