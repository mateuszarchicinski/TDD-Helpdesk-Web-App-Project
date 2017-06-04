app.service('auth', ['APP_CONFIG', '$http', 'md5', '$q', '$window', function (APP_CONFIG, $http, md5, $q, $window) {
    var apiConfig = APP_CONFIG.apiConfig,
        baseUrl = apiConfig.baseUrl || '/';


    var configSendRequest = {
        requests: {
            register: {
                method: 'post',
                url: apiConfig.registerUrl || 'auth/register'
            },
            login: {
                method: 'post',
                url: apiConfig.loginUrl || 'auth/login'
            },
            logout: {
                method: 'post',
                url: apiConfig.logoutUrl || 'auth/logout'
            },
            'user.read': {
                method: 'get',
                url: apiConfig.userUrl || 'auth/user',
                readBy: '_id'
            },
            'user.update': {
                method: 'put',
                url: apiConfig.userUrl || 'auth/user'
            },
            'user.delete': {
                method: 'delete',
                url: apiConfig.userUrl || 'auth/user',
                deleteBy: '_id'
            },
            users: {
                method: 'get',
                url: apiConfig.usersUrl || 'auth/users'
            },
            'issue.read': {
                method: 'get',
                url: apiConfig.issueUrl || 'auth/issue',
                readBy: '_id'
            },
            'issue.create': {
                method: 'post',
                url: apiConfig.issueUrl || 'auth/issue'
            },
            'issue.delete': {
                method: 'delete',
                url: apiConfig.issueUrl || 'auth/issue',
                deleteBy: '_id'
            },
            issues: {
                method: 'get',
                url: apiConfig.issuesUrl || 'auth/issues',
                readBy: 'role'
            },
            'note.create': {
                method: 'post',
                url: apiConfig.noteUrl || 'auth/note'
            }
        }
    };

    function sendRequest(user, type) {
        return $q(function (resolve, reject) {
            var request = configSendRequest.requests[type],
                completedUrl;

            if (!request) {
                return reject(false);
            }

            completedUrl = baseUrl + request.url;

            if (!user) {
                user = null;
            }

            if (user !== null && typeof user === 'object' && user.password) {
                user.password = md5.createHash(user.password);

                if (user.confirmPassword) {
                    delete user.confirmPassword;
                }
            }

            if ((type.indexOf('.delete') !== -1 || type.indexOf('.read') !== -1 || type === 'issues') && user !== null && typeof user === 'object') {
                if (request.deleteBy) {
                    completedUrl += '/' + user[request.deleteBy];
                }

                if (request.readBy) {
                    completedUrl += '/' + user[request.readBy];
                }

                user = null;
            }

            $http[request.method](completedUrl, user).then(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
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

    this.logout = function () {
        return sendRequest(null, 'logout');
    };

    this.user = function (type, user) {
        return sendRequest(user, 'user.' + type);
    };

    this.users = function (user) {
        return sendRequest(user, 'users');
    };

    this.issue = function (type, issue) {
        return sendRequest(issue, 'issue.' + type);
    };

    this.issues = function (user) {
        return sendRequest(user, 'issues');
    };

    this.note = function (type, note) {
        return sendRequest(note, 'note.' + type);
    };

    this.loginVia = loginVia;
}]);
