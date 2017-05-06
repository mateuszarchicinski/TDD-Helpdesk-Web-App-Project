app.controller('userPanelController', ['$scope', 'appState', function ($scope, appState) {
    $scope.user = {
        firstName: 'Mateusz',
        lastName: 'Archiciński',
        imageSource: 'images/icons/person_white.png'
    };

    this.userAccount = function () {
        console.log('Fn userAccount!');
    };

    this.userLogOut = function () {
        console.log('Fn userLogOut!');

        appState.setAuthorized(false);
    };
}]);
