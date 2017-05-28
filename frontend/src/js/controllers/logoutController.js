app.controller('logoutController', ['auth', 'authToken', 'user', '$state', function (auth, authToken, user, $state) {
    var logout = this.logout = function () {
        auth.logout().then(function () {
            authToken.removeToken();

            user.removeUser();

            $state.go('root');
            /* eslint-disable */
        }, function (err) {
            /* eslint-enable */

        });
    };

    logout();
}]);
