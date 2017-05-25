app.service('auth', ['APP_CONFIG', '$http', 'md5', '$q', '$window', function (APP_CONFIG, $http, md5, $q, $window) {
    var apiConfig = APP_CONFIG.apiConfig,
        baseUrl = apiConfig.baseUrl || '/';


    var configSendRequest = {
        requests: {
            register: {
                url: apiConfig.registerUrl || 'auth/register'
            },
            login: {
                url: apiConfig.loginUrl || 'auth/login'
            }
        }
    };

    function sendRequest(user, type) {
        var deferred = $q.defer(),
            request = configSendRequest.requests[type];

        if (!request) {
            return deferred.reject();
        }

        user = user || {};
        user.password = md5.createHash(user.password);

        $http.post(baseUrl + request.url, user).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }


    var configLoginVia = {
        providers: {
            facebook: {
                authEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
                clientId: APP_CONFIG.facebook.clientId,
                redirectUri: $window.location.origin + '/',
                scope: [
                    'email',
                    'public_profile'
                ],
                apiEndpoint: apiConfig.loginVia.facebookUrl || 'auth/facebook'
            },
            google: {
                authEndpoint: 'https://accounts.google.com/o/oauth2/auth',
                clientId: APP_CONFIG.google.clientId,
                redirectUri: $window.location.origin,
                scope: [
                    'email',
                    'profile'
                ],
                apiEndpoint: apiConfig.loginVia.googleUrl || 'auth/google'
            }
        },
        currentProvider: null,
        previusProvider: null,
        getCurrentProvider: function () {
            return this.providers[this.currentProvider];
        }
    };

    var newWindow = null,
        isEvent;

    function openNewWindow(url, options, forceReload) {
        if (newWindow === null || newWindow.closed || forceReload) {
            newWindow = $window.open(url, 'newWindow', options);
        } else {
            newWindow.focus();
        }

        return newWindow;
    }

    function loginVia(providerType) {
        var deferred = $q.defer(),
            provider = configLoginVia.providers[providerType];

        if (!provider) {
            return deferred.reject();
        }

        configLoginVia.previusProvider = configLoginVia.currentProvider;
        configLoginVia.currentProvider = providerType;

        var isEqual = configLoginVia.previusProvider === configLoginVia.currentProvider,
            url = provider.authEndpoint + '?client_id=' + provider.clientId + '&redirect_uri=' + provider.redirectUri + '&response_type=code' + '&scope=' + provider.scope.join(' '),
            options = 'width=500, height=500, left=' + ($window.outerWidth - 500) / 2 + ', top=' + ($window.outerHeight - 500) / 2.5;

        newWindow = openNewWindow(url, options, !isEqual);

        function fnOnMessage(evt) {
            var provider = configLoginVia.getCurrentProvider();

            if (evt.origin === $window.location.origin && evt.data.loginVia) {
                $http.post(baseUrl + provider.apiEndpoint, {
                    code: evt.data.code,
                    clientId: provider.clientId,
                    redirectUri: provider.redirectUri
                }).then(function (res) {
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                });

                newWindow.close();

                $window.removeEventListener('message', fnOnMessage);
                isEvent = false;
            }
        }

        if (!isEvent) {
            $window.addEventListener('message', fnOnMessage);
            isEvent = true;
        }

        return deferred.promise;
    }


    this.register = function (user) {
        return sendRequest(user, 'register');
    };

    this.login = function (user) {
        return sendRequest(user, 'login');
    };

    this.loginVia = loginVia;
}]);
