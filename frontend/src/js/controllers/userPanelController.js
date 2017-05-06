app.controller('userPanelController', ['$scope', '$state', function ($scope, $state) {
    $scope.user = {
        firstName: 'Mateusz',
        lastName: 'Archiciński',
        imageSource: 'images/icons/person_white.png'
    };

    this.userAccount = function () {
        $state.go('helpdesk', {
            fun: 'myaccount'
        });
    };

    this.userLogOut = function () {
        $state.go('helpdesk', {
            fun: 'logout'
        });
    };
}]);
