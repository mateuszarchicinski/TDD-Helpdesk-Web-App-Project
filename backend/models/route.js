// NODE MODULES
const mongoose = require('../services/mongoose');


// ROUTES CONFIG
const APP_CONFIG = require('../app.config');
const ROUTES_CONFIG = APP_CONFIG.ROUTES_CONFIG;


const routeSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
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


routeSchema.pre('save', function (next) {
    const self = this;
    const routeModelName = 'Route';
    const routeModel = mongoose.models[routeModelName] ? mongoose.model(routeModelName) : mongoose.model(routeModelName, routeSchema);

    routeModel.find({
        url: self.url,
        method: self.method
    }, [], {
        limit: 1
    }, (err, users) => {
        if (err) {
            return next(err);
        }

        if (users.length === 1) {
            return next(new Error({
                message: `Can not save route with url: ${self.url} and method: ${self.method}`,
                reason: 'The route was duplicated'
            }));
        }

        next();
    });
});


module.exports = {
    schema: routeSchema,
    model: mongoose.model('Route', routeSchema)
};
