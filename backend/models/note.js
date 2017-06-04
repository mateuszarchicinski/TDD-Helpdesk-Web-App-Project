// NODE MODULES
const mongoose = require('../services/mongoose');
const schema = mongoose.Schema;
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');


const noteSchema = new schema({
    _createdBy: {
        type: schema.Types.ObjectId,
        ref: 'User'
    },
    _issueId: {
        type: schema.Types.ObjectId,
        ref: 'Issue'
    },
    postDate: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        default: 'new'
    }
}, {
    versionKey: false
});


noteSchema.methods.toJSON = function () {
    const note = this.toObject();

    return note;
};


// PLUGINS
noteSchema.plugin(mongooseUniqueValidator);
noteSchema.plugin(mongooseTimestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
});


module.exports = {
    schema: noteSchema,
    model: mongoose.model('Note', noteSchema)
};
