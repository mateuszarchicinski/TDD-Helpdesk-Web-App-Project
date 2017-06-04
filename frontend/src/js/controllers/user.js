app.controller('userCtrl', ['$state', 'auth', 'user', function ($state, auth, user) {
    var self = this;

    self.user = $state.params;

    var getResources = this.getResources = function () {
        if (!self.user.firstName) {
            auth.user('read', self.user).then(function (res) {
                self.user = res.data;
            }, function (err) {

            });
        }
    }

    getResources();
}]);
