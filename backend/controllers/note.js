// HTTP CODES CONFIG
const HTTP_CODES_CONFIG = require('../app.config').HTTP_CODES_CONFIG;


// APP SERVICES
const mongoose = require('../services/mongoose');


// APP MODELS
const issueModelName = 'Issue';
const issueModel = mongoose.models[issueModelName] ? mongoose.model(issueModelName) : mongoose.model(issueModelName, require('../models/issue').schema);
const noteModelName = 'Note';
const noteModel = mongoose.models[noteModelName] ? mongoose.model(noteModelName) : mongoose.model(noteModelName, require('../models/note').schema);


/**
 * @module {Function} Note Controller
 * @description This module is used to adding notes. Available method: POST <Create>
 * @param {RequestObject} req Required param to pass request object
 * @param {ResponseObject} res Required param to pass response object
 * @param {NextFunction} next Required param to pass next function as a callback
 * @example
 * const app = require('express')();
 * const noteCtrl = require('./controllers/note');
 * 
 * app.post('/note', noteCtrl);
 * 
 * app.listen(3000, 'localhost'); // http://localhost:3000/note
 */


// Note Controller
module.exports = function (req, res, next) {
    const reqUser = req.user || {};

    issueModel.findById(req.body._issueId, (err, issue) => {
        if (err) {
            return next(err);
        }

        if (!issue) {
            return res.status(HTTP_CODES_CONFIG.NOT_FOUND).json({
                message: 'The resource not found!'
            });
        }

        req.body._createdBy = reqUser._id;

        const newNote = new noteModel(req.body);

        newNote.save((err, note) => {
            if (err) {
                return next(err);
            }

            issue.status = note.status;
            issue.notes.push(note._id);

            /* eslint-disable */
            issue.save((err, issue) => {
                /* eslint-enable */
                if (err) {
                    return next(err);
                }

                res.status(HTTP_CODES_CONFIG.CREATED).end();
            });
        });
    });
};
