// Api Controller
/* eslint-disable */
module.exports = function (req, res, next) {
    /* eslint-enable */

    // Sends a JSON with simple message
    res.status(200).json({
        message: 'This is API Route!'
    });

};
