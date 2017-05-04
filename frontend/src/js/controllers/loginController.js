app.controller('loginController', [function () {
    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();
    };
}]);
