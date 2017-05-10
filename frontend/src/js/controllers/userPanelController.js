app.controller('userPanelController', ['$scope', '$state', function ($scope, $state) {
    $scope.user = {
        firstName: 'Mateusz',
        lastName: 'Archiciński',
        imageSource: 'images/icons/person_white.png'
    };

    var userGo = function (service) {
        $state.go('helpdesk', {
            service: service
        });
    };

    this.userGo = userGo;
}]);
