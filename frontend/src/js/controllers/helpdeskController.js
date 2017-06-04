app.controller('helpdeskController', ['$mdSidenav', '$scope', '$state', 'user', 'auth', function ($mdSidenav, $scope, $state, user, auth) {
    this.toggleSidenav = function () {
        $mdSidenav('left').toggle();
    };

    var getResources = this.getResources = function () {
        if (!user.isUser()) {
            auth.user('read').then(function (res) {
                user(res.data);

                $scope.user = user.getUser();
                
                $scope.servicesTmpUrl = $scope.user.role !== 'user' ? 'components/_' + $scope.user.role + 'Services' : false;
                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */

            });
        } else {
            $scope.user = user.getUser();
            
            $scope.servicesTmpUrl = $scope.user.role !== 'user' ? 'components/_' + $scope.user.role + 'Services' : false;
        }
    };

    getResources();
}]);
