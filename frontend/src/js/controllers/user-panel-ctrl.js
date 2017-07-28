/**
 * @class angular_module.Module:app.Controller:userPanelCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'userPanelCtrl as UPC'
 * }
 * @example
 * <div ng-controller="userPanelCtrl as UPC"></div>
 */


app.controller('userPanelCtrl', ['$state', function ($state) {
    /**
     * @function userGo
     * @memberOf angular_module.Module:app.Controller:userPanelCtrl
     * @instance
     * @description This method provides ui-view state change
     * @param {String} service Required param to pass name of state to go
     * @example
     * this.userGo('logout');
     * @example
     * <button ng-click="UPC.userGo('logout')">Sign Out</button>
     */


    var userGo = function (service) {
        $state.go('helpdesk.' + service);
    };

    this.userGo = userGo;
}]);
