/*!
 *
 * Default Middleware
 *
 * Name: createFullUrl
 *
 * Descripton:
 * - Function without any arguments will return only base URL => PROTOCOL://HOST
 * - Function with path argument as string or number will create new full URL => PROTOCOL://HOST/PATH
 *
 * Usage:
 * - req.createFullUrl(path)
 *
 *
 * Name: redirectTo
 *
 * Descripton:
 * - Function without any arguments will redirect to root host by using status code 301 as default
 * - Function with path & status arguments will redirect to location which is created relative to root host plus given path with given status code => ROOT_HOST/PATH
 *
 * Usage:
 * - res.redirectTo(path, status)
 *
 */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


module.exports = function (req, res, next) {
    // req new functionality
    req.createFullUrl = (path) => {
        path = path || '';

        if (typeof path !== 'string' && typeof path !== 'number') {
            path = '';
        } else {
            path = path.toString();
        }

        if (path[0] !== '/' && path.length > 0) {
            path = `/${path}`;
        }

        return `${req.protocol}://${process.env.NODE_ENV === 'production' ? req.hostname : req.headers.host}${path}`;
    };


    // req new functionality
    res.redirectTo = (path, status) => {
        status = status || HTTP_CODES_CONFIG.REDIRECT.PERMANENT;
        path = req.createFullUrl(path);

        return res.redirect(status, path);
    };

    next();
};
