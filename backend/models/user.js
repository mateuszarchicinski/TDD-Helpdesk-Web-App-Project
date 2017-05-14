// NODE MODULES
const mongoose = require('../services/mongoose');
const bcrypt = require('bcrypt');
const mongooseUniqueValidator = require('mongoose-unique-validator');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});


userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user._id;
    delete user.password;

    return user;
};


userSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};


userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }

        user.password = hash;

        next();
    });
});


userSchema.plugin(mongooseUniqueValidator);


module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema)
};
