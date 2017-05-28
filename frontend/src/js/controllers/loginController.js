app.controller('loginController', ['auth', '$scope', 'authToken', 'user', '$state', function (auth, $scope, authToken, user, $state) {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();

        auth.login({
            email: $scope.email,
            password: $scope.password
        }).then(fnOnSuccess, fnOnError);
    };


    this.loginViaFacebook = function () {
        auth.loginVia('facebook').then(fnOnSuccess, fnOnError);
    };


    this.loginViaGoogle = function () {
        auth.loginVia('google').then(fnOnSuccess, fnOnError);
    };

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
}]);
