app.controller('registerController', ['$mdDialog', 'urlParams', function ($mdDialog, urlParams) {
    var registerForm = this.registerForm = {};

    registerForm.submit = function (evt) {
        evt.preventDefault();
    };

    var showDialog = function (name) {
        $mdDialog.show({
            templateUrl: 'views/' + urlParams.currentLanguage() + '/components/_' + name + 'Dialog.html',
            clickOutsideToClose: true
        });
    };

    this.showDialog = showDialog;
}]);
