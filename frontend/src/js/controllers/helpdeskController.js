app.controller('helpdeskController', ['$mdSidenav', '$state', function ($mdSidenav, $state) {
    this.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    this.funUrlTemplate = function () {
        return false;
    };

    console.log($state.params);
}]);
