/* eslint no-unused-vars: ["error", { "args": "none" }] */


// APP CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const alertHandler = require('../services/alert-handler');


module.exports = function (err, req, res, next) {
    const errorToJSON = {
        message: err.message,
        stack: err.stack,
        statusCode: err.statusCode ? err.statusCode : HTTP_CODES_CONFIG.SUPPORTED_ERRORS[0]
    };

    alertHandler('error', err);

    res.status(errorToJSON.statusCode).json(errorToJSON);
};
