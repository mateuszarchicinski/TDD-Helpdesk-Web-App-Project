/*!
 *
 * Default Middleware
 *
 * Descripton:
 * - Function without any arguments will return only base URL => PROTOCOL://HOST
 * - Function with path argument as string or number will create new full URL => PROTOCOL://HOST/PATH
 *
 * Usage:
 * - req.createFullUrl(path)
 *
 */


module.exports = function (req, res, next) {
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

    next();
};
