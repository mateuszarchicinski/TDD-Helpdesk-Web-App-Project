// Routes - Here you can specified your routes objects.
module.exports = [
    {
        url: '/auth/note',
        method: 'post',
        middlewares: 'ensure-authentication',
        controller: 'note'
    },
    {
        url: ['/auth/issues', '/auth/issues/:role'],
        middlewares: 'ensure-authentication',
        controller: 'issues'
    },
    {
        url: '/auth/issue/:_id',
        method: 'delete',
        middlewares: 'ensure-authentication',
        controller: 'issue'
    },
    {
        url: '/auth/issue',
        method: 'post',
        middlewares: 'ensure-authentication',
        controller: 'issue'
    },
    {
        url: '/auth/issue/:_id',
        middlewares: 'ensure-authentication',
        controller: 'issue'
    },
    {
        url: ['/auth/users', '/auth/users/:role'],
        middlewares: 'ensure-authentication',
        controller: 'users'
    },
    {
        url: '/auth/user/:_id',
        method: 'delete',
        middlewares: 'ensure-authentication',
        controller: 'user'
    },
    {
        url: '/auth/user/:_id',
        method: 'put',
        middlewares: 'ensure-authentication',
        controller: 'user'
    },
    {
        url: ['/auth/user', '/auth/user/:_id'],
        middlewares: 'ensure-authentication',
        controller: 'user'
    },
    {
        url: '/auth/facebook',
        method: 'post',
        controller: 'facebook'
    },
    {
        url: '/auth/google',
        method: 'post',
        controller: 'google'
    },
    {
        url: '/verification/email',
        controller: 'email-verification'
    },
    {
        url: '/auth/logout',
        method: 'post',
        middlewares: 'ensure-authentication',
        controller: 'logout'
    },
    {
        url: '/auth/login',
        method: 'post',
        controller: 'login'
    },
    {
        url: '/auth/register',
        method: 'post',
        controller: 'register'
    },
    {
        url: '/angular'
    },
    {
        url: ['/', '/:lang', '/:lang/*', '*'],
        middlewares: 'language',
        controller: 'angular'
    }
];


/* AN EXAMPLES

  NORMAL MOD ROUTES:

  {
    url: '/normal', // Pattern ---> /(^\/{1}[a-z0-9-_:{}*\/]{0,50}$|^\*$)/
    controller: 'main' // default
  },
  {
    url: ['/', '/:lang', '/:lang/:page', '/:lang/:page/*', '*'],
    method: 'get', // default
    middlewares: 'language', // custom language middleware
    controller: 'normal'
  }


  API MOD ROUTES:

  {
    url: '/api'
  },
  {
    url: '*',
    controller: 'api'
  }

*/
