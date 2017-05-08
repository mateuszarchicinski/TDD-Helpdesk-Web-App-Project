app.controller('rootController', ['$state', function ($state) {
    var redirectTo = this.redirectTo = function () {
        $state.go('login');
    };

    redirectTo();
}]);
