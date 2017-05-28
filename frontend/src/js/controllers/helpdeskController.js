app.controller('helpdeskController', ['$mdSidenav', '$scope', '$state', 'user', 'auth', function ($mdSidenav, $scope, $state, user, auth) {
    this.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    var userServices = {
        templateUrl: 'components/_adminServices',
        current: {
            templateUrl: $state.params.service === 'myaccount' ? '_myAccountService' : '_dashboardService'
        }
    };

    $scope.userServices = userServices;


    var getResources = this.getResources = function () {
        if (!user.isUser()) {
            auth.user().then(function (res) {
                user(res.data);
                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */

            });
        }
    };

    getResources();
}]);
