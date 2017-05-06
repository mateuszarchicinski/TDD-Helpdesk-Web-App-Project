app.controller('helpdeskController', ['$mdSidenav', '$scope', '$state', function ($mdSidenav, $scope, $state) {
    this.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    var userFun = {
        templateUrl: false,
        current: {
            templateUrl: $state.params.fun === 'myaccount' ? 'components/functionalities/sources/_myAccount' : 'components/functionalities/sources/_dashboard'
        }
    };

    $scope.fun = userFun;
}]);
