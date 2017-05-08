app.controller('loginController', ['appState', function (appState) {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();

        appState.setAuthorized(true);
    };
}]);
