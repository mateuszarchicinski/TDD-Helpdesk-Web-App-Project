'use strict';


// RESTFULL API - NODEJS & EXPRESSJS - SOURCE


// NODE MODULES
const express = require('express');


// APP CONFIG
const APP_CONFIG = require('./app.config.js');
const HTTP_CODES_CONFIG = APP_CONFIG.HTTP_CODES_CONFIG;


// APP HELPERS
const dataInjector = require('./helpers/data-injector');
const routesInjector = require('./helpers/routes-injector');


// APP MIDDLEWARES
const errorsHandler = require('./middlewares/errors-handler');
const middlewares = require('./middlewares/middlewares');


// APP SERVICES
const alertHandler = require('./services/alert-handler');
const mongoose = require('./services/mongoose');


// APP MODELS
const routeModelName = 'Route';
const routeModel = mongoose.models[routeModelName] ? mongoose.model(routeModelName) : mongoose.model(routeModelName, require('./models/route').schema);


// APP ROUTES
const routes = require('./routes/routes');


// MongoDB Connect ---> http://mongoosejs.com/docs/guide.html
mongoose.connect(`mongodb://${APP_CONFIG.MONGO_DB.USER}:${APP_CONFIG.MONGO_DB.PASSDOWRD}@${APP_CONFIG.MONGO_DB.HOST}:${APP_CONFIG.MONGO_DB.PORT}/${APP_CONFIG.MONGO_DB.NAME}`, APP_CONFIG.MONGO_DB.OPTIONS, (err) => {
    if (err) {
        alertHandler('error', err);
    }
});


// ExpressAPP Init ---> https://expressjs.com/en/4x/api.html
const app = express();


// Sets variables host, port, environment and trust proxy in app object
app.set('host', process.env.NODE_IP || APP_CONFIG.HOST);
app.set('port', process.env.NODE_PORT || APP_CONFIG.PORT);
app.set('env', process.env.NODE_ENV || APP_CONFIG.ENV);
app.set('trust proxy', app.get('env') === 'production');


// Injects all defined middlewares to app object
app.use(middlewares);


// Redirects all insecure requests to secure protocol HTTPS only in production environment
if (app.get('env') === 'production') {

    app.use((req, res, next) => {
        return req.protocol === 'https' ? next() : res.redirect(HTTP_CODES_CONFIG.REDIRECT.PERMANENT, 'https://' + req.hostname + req.url);
    });

}


// Serves static files from the directory, which is defined in the app.config.js file
app.use(express.static(`${__dirname}${APP_CONFIG.DIRECTORY.STATIC_DIR}`, {
    maxAge: 604800000
}));


////////////////////////////////////
//                                //
//          *** OPEN ***          //
//  * HERE ADD ALL YOUR ROUTES *  //
//                                //
////////////////////////////////////


/*****

1. First way not recommended: Example route code below.


app[METHOD:get,post,put,delete...]('/ROUTE_EXAMPLE', MIDDLEWARE(req, res, next), CONTROLLER FUNCTION(req, res, next) => {

    res.send('Your message!');

});


2. Second way recommended: Go into directory ./routes then in file routes.js define your routes as objects in array.

*****/


////////////////////////////////////
//                                //
//  * HERE ADD ALL YOUR ROUTES *  //
//         *** CLOSE ***          //
//                                //
////////////////////////////////////


// Injects static objects of routes to app object
routes.forEach((route) => {
    const getModule = (type, name) => {
        return require(`.${APP_CONFIG.DIRECTORY[type]}/${name}`);
    };
    const middlewares = [];

    if (route.middlewares instanceof Array) {
        route.middlewares.forEach((middleware) => {
            middlewares.push(getModule('middlewares', middleware));
        });
    }

    if (route.middlewares && typeof route.middlewares === 'string') {
        middlewares.push(getModule('middlewares', route.middlewares));
    }

    const controller = getModule('controllers', route.controller);

    route.method = route.method || 'get';
    app[route.method](route.url, middlewares, controller);
});


// Handles HTTP errors
app.use(errorsHandler);


// Event on CTRL+C keys pressing
process.on('SIGINT', () => {

    // Closes connection with MongoDB
    mongoose.connection.close(() => {
        process.exit(0);
    });

});


module.exports = {
    appSource: (port, host) => {
        const createServer = app.listen(port, host);

        createServer.on('close', () => {
            mongoose.connection.close();
        });

        return createServer;
    },
    appInitialize: () => {
        app.listen(app.get('port'), app.get('host'), () => {

            /* eslint-disable */
            console.log('\x1b[34m%s\x1b[0m', '[Restful API]', `Listening on address: http://${app.get('host')}:${app.get('port')}`);
            /* eslint-enable */

        });
    }
};
