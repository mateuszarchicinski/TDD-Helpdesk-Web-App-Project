// NODE MODULES
const mongoose = require('../services/mongoose');
const bcrypt = require('bcrypt');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const mongooseTimestamps = require('mongoose-timestamp');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    fullName: {
        type: String
    },
    gender: {
        type: String
    },
    pictures: [String],
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () {
            return this.facebookId || this.googleId ? false : true;
        }
    },
    isPassword: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'user'
    },
    active: {
        type: Boolean,
        default: false
    },
    active_tokens: [String],
    locale: {
        type: String
    },
    facebookId: {
        type: String
    },
    googleId: {
        type: String
    }
}, {
    versionKey: false
});


userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.password;
    delete user.active_tokens;
    delete user.facebookId;
    delete user.googleId;

    return user;
};


userSchema.methods.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, callback);
};


userSchema.methods.isActiveToken = function (token) {
    return this.active_tokens.includes(token);
};


userSchema.methods.removeToken = function (token) {
    const array = this.active_tokens;
    const index = array.indexOf(token);

    if (index !== -1) {
        array.splice(index, 1);
    }
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


// PLUGINS
userSchema.plugin(mongooseUniqueValidator);
userSchema.plugin(mongooseTimestamps, {
    createdAt: 'created',
    updatedAt: 'updated'
});


module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema)
};
