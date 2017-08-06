// APP CONFIG
module.exports = {
    HOST: 'localhost', // Development server will be on address: http://localhost:4848
    PORT: 4848,
    ENV: 'development',
    MONGO_DB: { // MongoDB Config - mongodb://USER:PASSWORD@HOST:PORT/NAME
        USER: '',
        PASSDOWRD: '',
        HOST: 'localhost',
        PORT: 27017,
        NAME: 'HELPDESK_APP_DB',
        OPTIONS: {
            config: {
                autoIndex: true
            }
        }
    },
    AUTH: { // Authentication config ~ Remember to configure these variables
        APP_TOKEN: {
            SECRET: 'APP_SECRET',
            EXPIRES: 7 // After 7 days an authorization token will expire
        },
        FACEBOOK: {
            SECRET: 'FACEBOOK_SECRET'
        },
        GOOGLE: {
            SECRET: 'GOOGLE_SECRET'
        }
    },
    SMTP: { // Smtp using ---> https://nodemailer.com/smtp/
        HOST: '',
        PORT: 465,
        USER: '',
        PASSWORD: ''
    },
    APP_CONFIG: 'app.config.js',
    HTTP_CODES_CONFIG: require('./httpCodes.config.js'),
    ROUTES_CONFIG: require('./routes.config.js'),
    PAGES_CONFIG: require('./pages.config.js'),
    DIRECTORY: {
        STATIC_DIR: '/assets', // Static files directory
    }
};
