// NODE MODULES
const mongoose = require('../services/mongoose');
const schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');


const issueSchema = new schema({
    _createdBy: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    postDate: {
        type: String
    },
    subject: {
        type: String
    },
    category: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'new'
    },
    notes: [
        {
            type: schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
}, {
    versionKey: false
});


issueSchema.methods.toJSON = function () {
    const issue = this.toObject();

    return issue;
};


// PLUGINS
issueSchema.plugin(mongooseUniqueValidator);
issueSchema.plugin(mongooseTimestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
});


module.exports = {
    schema: issueSchema,
    model: mongoose.model('Issue', issueSchema)
};
