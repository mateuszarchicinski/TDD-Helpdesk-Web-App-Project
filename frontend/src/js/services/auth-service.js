/**
 * @class angular_module.Module:app.Service:auth
 * @description This is an AngularJS service component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS service component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').service('auth', [function () {
 *  // Here is place for service logic
 * }]);
 */


app.service('auth', ['APP_CONFIG', '$window', 'sendRequest', 'authToken', 'user', '$state', function (APP_CONFIG, $window, sendRequest, authToken, user, $state) {
    var newWindow = null;

    function openNewWindow(url, options, forceReload) {
        if (newWindow === null || newWindow.closed || forceReload) {
            newWindow = $window.open(url, 'newWindow', options);
        } else {
            newWindow.focus();
        }

        return newWindow;
    }


    var configLoginVia = {
        providers: {
            facebook: {
                name: 'facebook',
                authEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                clientId: APP_CONFIG.facebook.clientId,
                redirectUri: $window.location.origin + '/',
                scope: [
                    'email',
                    'public_profile'
                ]
            },
            google: {
                name: 'google',
                authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                clientId: APP_CONFIG.google.clientId,
                redirectUri: $window.location.origin,
                scope: [
                    'email',
                    'profile'
                ]
            }
        },
        currentProvider: null,
        previusProvider: null,
        getCurrentProvider: function () {
            return this.providers[this.currentProvider];
        }
    };

    function loginVia(providerType) {
        var provider = configLoginVia.providers[providerType];

        if (!provider) {
            return;
        }

        configLoginVia.previusProvider = configLoginVia.currentProvider;
        configLoginVia.currentProvider = providerType;

        var isEqual = configLoginVia.previusProvider === configLoginVia.currentProvider,
            url = provider.authEndpoint + '?client_id=' + provider.clientId + '&redirect_uri=' + provider.redirectUri + '&response_type=code' + '&scope=' + provider.scope.join(' '),
            options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight - 500) / 2.5;

        newWindow = openNewWindow(url, options, !isEqual);
    }


    $window.addEventListener('message', function (evt) {
        var provider = configLoginVia.getCurrentProvider();

        if (evt.origin === $window.location.origin && evt.data.loginVia) {
            sendRequest(provider.name, {
                code: evt.data.code,
                clientId: provider.clientId,
                redirectUri: provider.redirectUri
            }).then(fnOnSuccess, fnOnError);

            newWindow.close();
        }
    });


    function fnOnSuccess(res) {
        var token = res.data.token;

        if (token) {
            authToken.setToken(token);

            user(res.data);

            $state.go('helpdesk.dashboard');
        }
    }

    /* eslint-disable */
    function fnOnError(err) {}
    /* eslint-enable */


    /**
     * @function auth&sdot;register
     * @memberOf angular_module.Module:app.Service:auth
     * @instance
     * @description This method provides user registration functionality
     * @param {Object} property Required param to pass user object from registration form
     * @example
     * angular.module('app').controller('exampleCtrl', ['auth', '$scope', function (auth, $scope){
     *  auth.register($scope.user);
     * }]);
     */


    this.register = function (user) {
        sendRequest('register', user).then(fnOnSuccess, fnOnError);
    };


    /**
     * @function auth&sdot;login
     * @memberOf angular_module.Module:app.Service:auth
     * @instance
     * @description This method provides user login functionality
     * @param {Object} property Required param to pass user object from login form
     * @example
     * angular.module('app').controller('exampleCtrl', ['auth', '$scope', function (auth, $scope){
     *  auth.login($scope.user);
     * }]);
     */


    this.login = function (user) {
        sendRequest('login', user).then(fnOnSuccess, fnOnError);
    };


    /**
     * @function auth&sdot;logout
     * @memberOf angular_module.Module:app.Service:auth
     * @instance
     * @description This method provides user logout functionality
     * @example
     * angular.module('app').controller('exampleCtrl', ['auth', function (auth){
     *  auth.logout();
     * }]);
     */


    this.logout = function () {
        sendRequest('logout').then(function () {
            authToken.removeToken();

            user.removeUser();

            $state.go('root');

            /* eslint-disable */
        }, function (err) {
            /* eslint-enable */
        });
    };


    /**
     * @function auth&sdot;user
     * @memberOf angular_module.Module:app.Service:auth
     * @instance
     * @description This method provides any kind of user resource
     * @param {String} type Required param to pass name of request type
     * @param {Object} user Required param to pass user object
     * @example
     * angular.module('app').controller('exampleCtrl', ['auth', function (auth){
     *  auth.user('read');
     * }]);
     */


    this.user = function (type, user) {
        return sendRequest('user.' + type, user);
    };


    /**
     * @function auth&sdot;loginVia
     * @memberOf angular_module.Module:app.Service:auth
     * @instance
     * @description This method provides user login via Facebook & Google
     * @param {String} providerType Required param to pass name of provider type
     * @example
     * angular.module('app').controller('exampleCtrl', ['auth', function (auth){
     *  auth.loginVia('facebook'); // or auth.loginVia('google');
     * }]);
     */


    this.loginVia = loginVia;
}]);
