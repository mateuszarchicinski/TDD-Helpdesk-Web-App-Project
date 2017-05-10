app.controller('loginController', ['appState', function (appState) {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();
    };

    this.loginVia = function (provider) {
        appState.setAuthorized(true);
    };
}]);
