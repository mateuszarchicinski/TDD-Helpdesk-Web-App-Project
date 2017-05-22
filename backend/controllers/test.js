module.exports = function (req, res, next) {
    const obj = req.user || {};

    res.status(200).json(obj);
};
