// NODE MODULES
const mongoose = require('../services/mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');


// ROUTES CONFIG
const ROUTES_CONFIG = require('../app.config').ROUTES_CONFIG;


const routeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    },
    method: {
        type: String,
        default: ROUTES_CONFIG.MODEL.DEFAULT_METHOD
    },
    middlewares: {
        type: String
    },
    controller: {
        type: String,
        default: ROUTES_CONFIG.MODEL.DEFAULT_CONTROLLER
    }
}, {
    versionKey: false
});


routeSchema.methods.getMiddlewares = function () {
    const strArr = this.middlewares ? this.middlewares.split(',') : [];
    const midArr = [];

    strArr.forEach((elem) => {
        midArr.push(require(`..${ROUTES_CONFIG.DIRECTORY.MIDDLEWARES_DIR}/${elem}`));
    });

    return midArr;
};


routeSchema.methods.getController = function () {
    return require(`..${ROUTES_CONFIG.DIRECTORY.CONTROLLERS_DIR}/${this.controller}`);
};


routeSchema.plugin(mongooseUniqueValidator);


module.exports = {
    schema: routeSchema,
    model: mongoose.model('Route', routeSchema)
};
