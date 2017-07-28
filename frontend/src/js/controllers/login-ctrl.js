/**
 * @class angular_module.Module:app.Controller:loginCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'loginCtrl as LC'
 * }
 * @example
 * <div ng-controller="loginCtrl as LC"></div>
 */


app.controller('loginCtrl', ['auth', '$scope', function (auth, $scope) {
    /**
     * @function loginForm&sdot;submit
     * @memberOf angular_module.Module:app.Controller:loginCtrl
     * @instance
     * @description This method is used to sends login form with validated user data
     * @example
     * this.loginForm.submit($event);
     * loginForm.submit($event);
     * @example
     * <form name="loginForm" ng-submit="loginForm.$invalid || LC.loginForm.submit($event)"></form>
     */


    var loginForm = this.loginForm = {};

    loginForm.submit = function (evt) {
        evt.preventDefault();

        auth.login(angular.copy($scope.user));
    };


    /**
     * @function loginViaFacebook
     * @memberOf angular_module.Module:app.Controller:loginCtrl
     * @instance
     * @description This method provides login via Facebook
     * @example
     * this.loginViaFacebook();
     * @example
     * <button ng-click="LC.loginViaFacebook()"></button>
     */


    this.loginViaFacebook = function () {
        auth.loginVia('facebook');
    };


    /**
     * @function loginViaGoogle
     * @memberOf angular_module.Module:app.Controller:loginCtrl
     * @instance
     * @description This method provides login via Google
     * @example
     * this.loginViaGoogle();
     * @example
     * <button ng-click="LC.loginViaGoogle()"></button>
     */


    this.loginViaGoogle = function () {
        auth.loginVia('google');
    };
}]);
