/*!
 *
 * Language Middleware
 *
 * Required:
 * - Specified param :lang or {lang} in a path of route e.g. /:lang/*
 *
 * Description:
 * - To req object will be added lang property which return object with properties value and exist <object>
 * - req.lang.value - will return correct language value or default value <string>
 * - req.lang.exist - will return true if exist otherwise false <boolean>
 *
 * Usage:
 * - req.lang
 *
 */


// PAGES CONFIG
const PAGES_CONFIG = require('../app.config').PAGES_CONFIG;


module.exports = function (req, res, next) {
    const lang = req.params.lang;

    req.lang = {
        value: PAGES_CONFIG.LANGUAGES.includes(lang) ? lang : PAGES_CONFIG.LANGUAGES[0],
        exist: lang ? true : false
    };

    next();
};
