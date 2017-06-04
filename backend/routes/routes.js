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
            url: '/auth/note',
            method: 'post',
            middlewares: 'ensureAuthentication',
            controller: 'noteController'
        },
        {
            url: '/auth/issues/:role',
            method: 'get',
            middlewares: 'ensureAuthentication',
            controller: 'issuesController'
        },
        {
            url: '/auth/issues',
            method: 'get',
            middlewares: 'ensureAuthentication',
            controller: 'issuesController'
        },
        {
            url: '/auth/issue/:id',
            method: 'delete',
            middlewares: 'ensureAuthentication',
            controller: 'issueController'
        },
        {
            url: '/auth/issue',
            method: 'put',
            middlewares: 'ensureAuthentication',
            controller: 'issueController'
        },
        {
            url: '/auth/issue',
            method: 'post',
            middlewares: 'ensureAuthentication',
            controller: 'issueController'
        },
        {
            url: '/auth/issue/:id',
            method: 'get',
            middlewares: 'ensureAuthentication',
            controller: 'issueController'
        },
        {
            url: '/auth/users',
            method: 'get',
            middlewares: 'ensureAuthentication',
            controller: 'usersController'
        },
        {
            url: '/auth/user',
            method: 'delete',
            middlewares: 'ensureAuthentication',
            controller: 'userController'
        },
        {
            url: '/auth/user',
            method: 'put',
            middlewares: 'ensureAuthentication',
            controller: 'userController'
        },
        {
            url: ['/auth/user', '/auth/user/:id'],
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
