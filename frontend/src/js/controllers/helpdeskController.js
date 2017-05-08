app.controller('helpdeskController', ['$mdSidenav', '$scope', '$state', function ($mdSidenav, $scope, $state) {
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
}]);
