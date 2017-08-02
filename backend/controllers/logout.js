// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


/**
 * @module {Function} Logout Controller
 * @description This module is used to user logout. Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const logoutCtrl = require('./controllers/logout');
 * 
 * app.get('/logout', logoutCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/logout
 */


// Logout Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    reqUser.removeToken(reqUser.token);

    /* eslint-disable */
    reqUser.save((err, user) => {
        /* eslint-enable */
        if (err) {
            return next(err);
        }

        res.status(HTTP_CODES_CONFIG.UPDATED).end();
    });
};
