app.controller('userPanelController', ['$scope', function ($scope) {

    $scope.user = {
        firstName: 'Mateusz',
        lastName: 'Archiciński',
        imageSource: 'images/icons/person_white.png'
    };

    this.showUserMenu = function (event, userMenu) {
        event.preventDefault();

        console.log('Fn showUserMenu!');

        userMenu();
    };

    this.userMenu = function () {
        console.log('Fn userMenu!');
    };

}]);
