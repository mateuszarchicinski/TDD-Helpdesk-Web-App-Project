// Routes - Here you can specified routes for each mode: normal, angular and api.
module.exports = {
    normal: [ // Normal mod routes:
        {
            url: '/normal', // Pattern ---> /(^\/{1}[a-z0-9-_:{}*\/]{0,50}$|^\*$)/
            controller: 'mainController' // default
        },
        {
            url: ['/', '/:lang', '/:lang/:page', '/:lang/:page/*', '*'],
            method: 'get', // default
            middlewares: 'language', // custom language middleware
            controller: 'normalController'
        }
    ],
    angular: [ // Angular mod routes:
        {
            url: '/test',
            middlewares: 'ensureAuthentication',
            controller: 'test'
        },
        {
            url: '/auth/user',
            middlewares: 'ensureAuthentication',
            controller: 'userController'
        },
        {
            url: '/auth/facebook',
            method: 'post',
            controller: 'facebookController'
        },
        {
            url: '/auth/google',
            method: 'post',
            controller: 'googleController'
        },
        {
            url: '/verification/email',
            controller: 'emailVerification'
        },
        {
            url: '/auth/logout',
            method: 'post',
            middlewares: 'ensureAuthentication',
            controller: 'logoutController'
        },
        {
            url: '/auth/login',
            method: 'post',
            controller: 'loginController'
        },
        {
            url: '/auth/register',
            method: 'post',
            controller: 'registerController'
        },
        {
            url: '/angular'
        },
        {
            url: ['/', '/:lang', '/:lang/*', '*'],
            middlewares: 'language',
            controller: 'angularController'
        }
    ],
    api: [ // Api mod routes:
        {
            url: '/api'
        },
        {
            url: '*',
            controller: 'apiController'
        }
    ]
};
