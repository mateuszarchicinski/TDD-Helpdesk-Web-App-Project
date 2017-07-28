/**
 * @class angular_module.Module:app.Controller:helpdeskCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'helpdeskCtrl as HC'
 * }
 * @example
 * <div ng-controller="helpdeskCtrl as HC"></div>
 */


app.controller('helpdeskCtrl', ['$mdSidenav', 'user', 'auth', '$scope', function ($mdSidenav, user, auth, $scope) {
    /**
     * @function spacerStyle
     * @memberOf angular_module.Module:app.Controller:helpdeskCtrl
     * @instance
     * @description This method is used to sets correct styles to spacer element
     * @example
     * this.spacerStyle();
     * @example
     * <div ng-style="HC.spacerStyle()"></div>
     */


    this.spacerStyle = function () {
        if ($scope.user && $scope.user.fullName) {
            return {
                width: angular.element('.user-panel')[0].offsetWidth + 'px'
            };
        }

        return {};
    };


    /**
     * @function toggleSidenav
     * @memberOf angular_module.Module:app.Controller:helpdeskCtrl
     * @instance
     * @description This method provides sidenav toggle functionality (show/hide DOM element)
     * @example
     * this.toggleSidenav();
     * @example
     * <button ng-click="HC.toggleSidenav()">Toggle Sidenav</button>
     */


    this.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };


    /**
     * @function getResources
     * @memberOf angular_module.Module:app.Controller:helpdeskCtrl
     * @instance
     * @description This method takes care of user resources, gets them if not available
     * @example
     * this.getResources();
     * getResources();
     */


    var getResources = this.getResources = function () {
        if (!user.isUser()) {
            auth.user('read').then(function (res) {
                user(res.data);

                $scope.user = user.getUser();

                $scope.servicesTmpUrl = $scope.user.role !== 'user' ? 'components/_' + $scope.user.role + '-services' : false;

                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */
            });
        } else {
            $scope.user = user.getUser();

            $scope.servicesTmpUrl = $scope.user.role !== 'user' ? 'components/_' + $scope.user.role + '-services' : false;
        }
    };

    getResources();
}]);
