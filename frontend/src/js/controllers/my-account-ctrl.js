/**
 * @class angular_module.Module:app.Controller:myAccountCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'myAccountCtrl as MAC'
 * }
 * @example
 * <div ng-controller="myAccountCtrl as MAC"></div>
 */


app.controller('myAccountCtrl', ['$scope', 'auth', 'user', 'urlParams', '$mdDialog', 'authToken', '$state', function ($scope, auth, user, urlParams, $mdDialog, authToken, $state) {
    /**
     * @function userForm&sdot;submit
     * @memberOf angular_module.Module:app.Controller:myAccountCtrl
     * @instance
     * @description This method is used to update the user profile via user form which also validates data typed by user
     * @example
     * this.userForm.submit($event);
     * userForm.submit($event);
     * @example
     * <form name="userForm" ng-submit="userForm.$invalid || MAC.userForm.submit($event)"></form>
     */


    var userForm = this.userForm = {};

    userForm.submit = function (evt) {
        var updUser = $scope.user;

        evt.preventDefault();

        if (!updUser.fullName) {
            updUser.fullName = updUser.firstName + ' ' + updUser.lastName;
        }

        if (!updUser.isPassword && updUser.password) {
            updUser.isPassword = true;
        }

        auth.user('update', angular.copy(updUser)).then(function (res) {
            user.removeUser();
            user(res.data);

            $scope.user = user.getUser();

            delete updUser.password;
            delete updUser.confirmPassword;

            /* eslint-disable */
        }, function (err) {
            /* eslint-enable */

        });
    };


    /**
     * @function userForm&sdot;delete
     * @memberOf angular_module.Module:app.Controller:myAccountCtrl
     * @instance
     * @description This method is used to delete the user profile, only after user deletion confirmation
     * @example
     * this.userForm.delete();
     * userForm.delete();
     * @example
     * <button ng-click="MAC.userForm.delete()">Delete Account</button>
     */


    userForm.delete = function () {
        var dialogConfig = {
            templateUrl: 'views/' + urlParams.currentLanguage() + '/components/_confirm-deletion-dialog.html',
            clickOutsideToClose: true,
            controller: ['$mdDialog', function ($mdDialog) {
                this.isConfirmation = function (boolean) {
                    $mdDialog.hide(boolean);
                };
            }],
            controllerAs: 'CDC',
            parent: angular.element(document.body)
        };

        $mdDialog.show(dialogConfig).then(function (isConfirmed) {
            if (isConfirmed) {
                /* eslint-disable */
                auth.user('delete', user.getUser()).then(function (res) {}, function (err) {
                    if (err.status === 410) {
                        authToken.removeToken();

                        user.removeUser();

                        $state.go('root');
                    }
                });
                /* eslint-enable */
            }
        }, function () {});
    };
}]);
