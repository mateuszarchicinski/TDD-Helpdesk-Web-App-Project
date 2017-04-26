// NODE MODULES
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');


// APP MIDDLEWARES
const defMiddleware = require('./default');


// Middlewares - Here you can specify all your middlewares which gonna be automatically injected to app object
module.exports = [

    // Enables all Cross-Origin Resource Sharing (CORS) requests, more info about CORS middleware ---> https://github.com/expressjs/cors#cors
    cors(),

    // Parses incoming request bodies before your handler start, more info about BODY PARSER middleware ---> https://github.com/expressjs/body-parser#body-parser
    bodyParser.json(),
    bodyParser.urlencoded({
        extended: true
    }),

    // Compresses response bodies for all request, more info about COMPRESSION middleware ---> https://github.com/expressjs/compression#compression
    compression({
        threshold: 0
    }),

    // Default middleware - Provides some useful functionality
    defMiddleware

];
