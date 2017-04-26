// APP CONFIG
module.exports = {
    MODE: 'angular', // normal / angular / api <-- Only these modes available
    HOST: 'localhost', // Development server will be on address: http://localhost:4848
    PORT: 4848,
    ENV: 'development',
    MONGO_DB: { // MongoDB Config - mongodb://USER:PASSWORD@HOST:PORT/NAME
        USER: '',
        PASSDOWRD: '',
        HOST: 'localhost',
        PORT: 27017,
        NAME: 'helpdesk-backend',
        OPTIONS: {
            config: {
                autoIndex: true
            }
        }
    },
    APP_CONFIG: 'app.config.js',
    HTTP_CODES_CONFIG: require('./httpCodes.config.js'),
    ROUTES_CONFIG: require('./routes.config.js'),
    PAGES_CONFIG: require('./pages.config.js'),
    DIRECTORY: {
        STATIC_DIR: '/assets', // Static files directory
    }
};
