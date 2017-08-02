// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);


/**
 * @module {Function} Issues Controller
 * @description This module provides issues resources. Only an appropriate users have access to that resources. Available method: GET <Read>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const issuesCtrl = require('./controllers/issues');
 * 
 * app.get('/issues', issuesCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/issues
 */


// Issues Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};
    const findBy = {};
    const userSelection = ['_id', 'firstName', 'lastName', 'fullName', 'pictures'];

    if (reqUser.role === 'user' || !req.params.role || reqUser.role !== req.params.role) {
        findBy._id = {
            $in: reqUser.issues
        };
    }

    issueModel.find(findBy).populate({
        path: '_createdBy',
        select: userSelection
    }).populate({
        path: 'notes',
        populate: {
            path: '_createdBy',
            select: userSelection
        }
    }).exec((err, issues) => {
        if (err) {
            return next(err);
        }

        res.status(HTTP_CODES_CONFIG.SUCCESS).json(issues);
    });
};
