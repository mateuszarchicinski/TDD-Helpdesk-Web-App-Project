// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);


// Issues Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};
    const findBy = {};

    if (!req.params.role) {
        findBy._id = {
            $in: reqUser.issues
        };
    }

    issueModel.find(findBy).populate('_createdBy').populate({
        path: 'notes',
        populate: {
            path: '_createdBy'
        }
    }).exec((err, issues) => {
        if (err) {
            return next(err);
        }

        res.status(HTTP_CODES_CONFIG.SUCCESS).json(issues);
    });
};
