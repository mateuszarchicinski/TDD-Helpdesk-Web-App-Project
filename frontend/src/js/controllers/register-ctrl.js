/**
 * @class angular_module.Module:app.Controller:registerCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'registerCtrl as RC'
 * }
 * @example
 * <div ng-controller="registerCtrl as RC"></div>
 */


app.controller('registerCtrl', ['auth', '$scope', '$mdDialog', 'urlParams', function (auth, $scope, $mdDialog, urlParams) {
    /**
     * @function registerForm&sdot;submit
     * @memberOf angular_module.Module:app.Controller:registerCtrl
     * @instance
     * @description This method is used to sends registration form with validated user data
     * @example
     * this.regsiterForm.submit($event);
     * registerForm.submit($event);
     * @example
     * <form name="registerForm" ng-submit="registerForm.$invalid || RC.regsiterForm.submit($event)"></form>
     */


    var registerForm = this.registerForm = {};

    registerForm.submit = function (evt) {
        evt.preventDefault();

        auth.register(angular.copy($scope.user));
    };


    /**
     * @function showDialog
     * @memberOf angular_module.Module:app.Controller:registerCtrl
     * @instance
     * @description This method is used to shows and hides new dialog window
     * @param {String} dialogTmpName Required param to pass HTML template name of mdDialog component
     * @example
     * this.showDialog('terms&conditions');
     * this.showDialog('privacy-policy');
     * @example
     * <button ng-click="RC.showDialog('terms&conditions')"></button>
     * <button ng-click="RC.showDialog('privacy-policy')"></button>
     */


    this.showDialog = function (dialogTmpName) {
        $mdDialog.show({
            templateUrl: 'views/' + urlParams.currentLanguage() + '/components/_' + dialogTmpName + '-dialog.html',
            clickOutsideToClose: true
        });
    };
}]);
