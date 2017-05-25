app.controller('loginController', ['auth', '$scope', 'authToken', '$state', function (auth, $scope, authToken, $state) {
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

            $state.go('helpdesk');
        }
    }

    function fnOnError(err) {
        console.log(err);
    }
}]);
