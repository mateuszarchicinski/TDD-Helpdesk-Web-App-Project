app.controller('loginController', ['auth', '$scope', function (auth, $scope) {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();

        auth.login({
            email: $scope.email,
            password: $scope.password
        });
    };

    this.loginVia = auth.loginVia;
}]);
