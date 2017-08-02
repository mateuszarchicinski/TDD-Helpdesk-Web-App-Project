// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);


/**
 * @module {Function} Issue Controller
 * @description This module provides issue resource. Only an appropriate user has access to that resources. Available methods: GET <Read> /{_id} | POST <Create> | DELETE /{_id}
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const issueCtrl = require('./controllers/issue');
 * 
 * app.get('/issue/:_id', issueCtrl);
 * app.post('/issue', issueCtrl);
 * app.delete('/issue/:_id', issueCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/issue/{_id}  |  http://localhost:3000/issue
 */


// Issue Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};
    const userSelection = ['_id', 'firstName', 'lastName', 'fullName', 'pictures'];

    // METHOD: GET / READ
    if (req.method === 'GET') {
        issueModel.findById(req.params._id).populate({
            path: '_createdBy',
            select: userSelection
        }).populate({
            path: 'notes',
            populate: {
                path: '_createdBy',
                select: userSelection
            }
        }).exec((err, issue) => {
            if (err) {
                return next(err);
            }

            if (!issue) {
                return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                    message: 'The resource not found!'
                });
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(issue);
        });
    }

    // METHOD: POST / CREATE
    if (req.method === 'POST') {
        req.body._createdBy = reqUser._id;

        const newIssue = new issueModel(req.body);

        newIssue.save((err, issue) => {
            if (err) {
                return next(err);
            }

            reqUser.issues.push(issue._id);

            /* eslint-disable */
            reqUser.save((err, user) => {
                /* eslint-enable */
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.CREATED).end();
            });
        });
    }

    // METHOD: DELETE
    if (req.method === 'DELETE') {
        const issueId = req.params._id;

        reqUser.removeIssue(issueId);

        /* eslint-disable */
        reqUser.save((err, user) => {
            /* eslint-enable */
            if (err) {
                return next(err);
            }

            issueModel.findByIdAndRemove(issueId, (err, issue) => {
                if (err) {
                    return next(err);
                }

                if (!issue) {
                    return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                        message: 'The resource not found!'
                    });
                }

                res.status(HTTP_CODES_CONFIG.DELETED).end();
            });
        });
    }
};
