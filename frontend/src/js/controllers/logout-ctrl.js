/**
 * @class angular_module.Module:app.Controller:logoutCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'logoutCtrl as LC'
 * }
 * @example
 * <div ng-controller="logoutCtrl as LC"></div>
 */


app.controller('logoutCtrl', ['auth', function (auth) {
    /**
     * @function logout
     * @memberOf angular_module.Module:app.Controller:logoutCtrl
     * @instance
     * @description This method is used to log out user from application
     * @example
     * this,logout();
     * logout();
     */


    var logout = this.logout = function () {
        auth.logout();
    };

    logout();
}]);
