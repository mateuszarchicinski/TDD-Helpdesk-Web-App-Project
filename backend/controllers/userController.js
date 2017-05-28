/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// User Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    res.status(HTTP_CODES_CONFIG.SUCCESS).json(reqUser);
};
