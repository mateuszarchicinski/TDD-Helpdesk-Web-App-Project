/**
 * @class angular_module.Module:app.Controller:userCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'userCtrl as UC'
 * }
 * @example
 * <div ng-controller="userCtrl as UC"></div>
 */


app.controller('userCtrl', ['$scope', '$state', 'sendRequest', function ($scope, $state, sendRequest) {
    $scope.crrUser = $state.params;


    /**
     * @function getResources
     * @memberOf angular_module.Module:app.Controller:userCtrl
     * @instance
     * @description This method takes care of current user resources, gets them if not available
     * @example
     * this.getResources();
     * getResources();
     */


    var getResources = this.getResources = function () {
        if (!$scope.crrUser.firstName) {
            sendRequest('user.read', $scope.crrUser).then(function (res) {
                $scope.crrUser = res.data;

                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */
            });
        }
    };

    getResources();
}]);
