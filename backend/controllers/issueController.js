/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);


// Issue Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    // METHOD: GET / READ
    if (req.method === 'GET') {
        issueModel.find({
            _id: req.params.id
        }, [], {
            limit: 1
        }).populate('_createdBy').populate({
            path: 'notes',
            populate: {
                path: '_createdBy'
            }
        }).exec((err, issues) => {
            if (err) {
                return next(err);
            }

            res.status(HTTP_CODES_CONFIG.SUCCESS).json(issues[0]);
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

            reqUser.issues.push(newIssue._id);

            reqUser.save((err, user) => {
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.SUCCESS).end();
            });
        });
    }

    // METHOD: DELETE
    if (req.method === 'DELETE') {
        const issueId = req.params.id;

        reqUser.removeIssue(issueId);

        reqUser.save((err, user) => {
            if (err) {
                return next(err);
            }

            issueModel.findOneAndRemove({
                _id: issueId
            }, (err, issue) => {
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.SUCCESS).end();
            });
        });
    }
};
