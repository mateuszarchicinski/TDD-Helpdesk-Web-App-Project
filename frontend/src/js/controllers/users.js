app.controller('usersCtrl', ['auth', 'user', '$scope', function (auth, user, $scope) {
    var users;

    auth.users().then(function (res) {
        user.set('users', res.data);

        users = $scope.users = user.get('users');

        /* eslint-disable */
    }, function (err) {
        /* eslint-enable */
    });

    this.removeUser = function (user) {
        users.splice(users.indexOf(user), 1);

        auth.user('delete', user).then(function (res) {

        }, function (err) {

        });
    };
}]);
