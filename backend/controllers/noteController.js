/* eslint no-unused-vars: ["error", { "args": "none" }] */


// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);
const noteModelName = 'Note';
const noteModel = mongoose.models[noteModelName] ? mongoose.model(noteModelName) : mongoose.model(noteModelName, require('../models/note').schema);


// Note Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    issueModel.find({
        _id: req.body._issueId
    }, [], {
        limit: 1
    }, (err, issues) => {
        if (err) {
            return next(err);
        }

        const issue = issues[0];

        if (issue) {
            const newNote = new noteModel({
                _createdBy: reqUser._id,
                _issueId: issue._id,
                postDate: req.body.postDate,
                description: req.body.description,
                status: req.body.status
            });

            newNote.save((err, note) => {
                if (err) {
                    return next(err);
                }

                issue.status = note.status;
                issue.notes.push(note._id);

                issue.save((err, issue) => {
                    if (err) {
                        return next(err);
                    }

                    res.status(HTTP_CODES_CONFIG.SUCCESS).end();
                });
            });
        } else {
            res.status(HTTP_CODES_CONFIG.BAD_REQUEST).end();
        }
    });
};
