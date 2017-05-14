app.controller('registerController', ['$mdDialog', 'urlParams', '$scope', '$http', function ($mdDialog, urlParams, $scope, $http) {
    var registerForm = this.registerForm = {};

    registerForm.submit = function (evt) {
        evt.preventDefault();

        $http.post('http://localhost:4848/auth/register', {
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
