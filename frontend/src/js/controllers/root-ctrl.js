/**
 * @class angular_module.Module:app.Controller:rootCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'rootCtrl as RC'
 * }
 * @example
 * <div ng-controller="rootCtrl as RC"></div>
 */


app.controller('rootCtrl', ['appState', '$state', function (appState, $state) {
    /**
     * @function redirectTo
     * @memberOf angular_module.Module:app.Controller:rootCtrl
     * @instance
     * @description This method handles redirects to right ui-view state during unauthorized/authorized app state
     * @example
     * this.redirectTo();
     * redirectTo();
     */


    var redirectTo = this.redirectTo = function () {
        var defaultState = 'login';

        if (appState.isAuthorized()) {
            defaultState = 'helpdesk.dashboard';
        }

        $state.go(defaultState);
    };

    redirectTo();
}]);
