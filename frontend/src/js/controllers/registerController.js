app.controller('registerController', ['auth', '$scope', 'authToken', 'user', '$state', '$mdDialog', 'urlParams', function (auth, $scope, authToken, user, $state, $mdDialog, urlParams) {
    var registerForm = this.registerForm = {};

    registerForm.submit = function (evt) {
        evt.preventDefault();

        auth.register({
            firstName: $scope.firstName,
            email: $scope.email,
            password: $scope.password
        }).then(fnOnSuccess, fnOnError);
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


    var showDialog = function (name) {
        $mdDialog.show({
            templateUrl: 'views/' + urlParams.currentLanguage() + '/components/_' + name + 'Dialog.html',
            clickOutsideToClose: true
        });
    };

    this.showDialog = showDialog;
}]);
