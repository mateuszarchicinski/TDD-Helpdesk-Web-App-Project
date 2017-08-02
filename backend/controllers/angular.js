// APP CONFIG
const APP_CONFIG = require('../app.config');
const PAGES_CONFIG = APP_CONFIG.PAGES_CONFIG;


/**
 * @module {Function} Angular Controller
 * @description This module is used to sends the appropriate HTML file of an angular application. Available method: GET
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const angularCtrl = require('./controllers/angular');
 * 
 * app.get(['/', '/:lang', '/:lang/*', '*'], angularCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/pl  |  http://localhost:3000/en
 */


// Angular Controller
module.exports = function (req, res, next) {
    const lang = req.lang;

    // Redirects to page main address
    if (/^\/{3}.*$/.test(req.url)) {
        return res.redirectTo();
    }

    // Sends the appropriate HTML file of angular application
    res.status(200).type('html').sendFile(`index-${lang.value}.html`, {
        root: `${__dirname}/..${APP_CONFIG.DIRECTORY.STATIC_DIR}`,
        headers: PAGES_CONFIG.HEADERS
    }, (err) => {
        if (err) {
            next(err);
        }
    });
};
