app.controller('registerController', ['auth', '$scope', '$mdDialog', 'urlParams', function (auth, $scope, $mdDialog, urlParams) {
    var registerForm = this.registerForm = {};

    registerForm.submit = function (evt) {
        evt.preventDefault();

        auth.register({
            firstName: $scope.firstName,
            email: $scope.email,
            password: $scope.password
        });
    };

    var showDialog = function (name) {
        $mdDialog.show({
            templateUrl: 'views/' + urlParams.currentLanguage() + '/components/_' + name + 'Dialog.html',
            clickOutsideToClose: true
        });
    };

    this.showDialog = showDialog;
}]);
