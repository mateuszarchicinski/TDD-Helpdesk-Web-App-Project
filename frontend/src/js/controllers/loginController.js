app.controller('loginController', ['appState', '$scope', '$http', function (appState, $scope, $http) {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();

        $http.post('http://localhost:4848/auth/login', {
            email: $scope.email,
            password: $scope.password
        });
    };

    this.loginVia = function (provider) {
        appState.setAuthorized(true);
    };
}]);
