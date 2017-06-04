app.controller('myAccountController', ['auth', '$scope', 'user', 'authToken', '$state', '$mdDialog', function (auth, $scope, user, authToken, $state, $mdDialog) {
    var userForm = this.userForm = {};

    userForm.submit = function (evt) {
        evt.preventDefault();

        var updatedUser = angular.copy($scope.user);

        updatedUser.fullName = updatedUser.firstName + ' ' + updatedUser.lastName;
        updatedUser.isPassword = !updatedUser.isPassword && updatedUser.password ? true : updatedUser.isPassword;

        auth.user('update', {
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            fullName: updatedUser.fullName,
            gender: updatedUser.gender,
            password: updatedUser.password,
            isPassword: updatedUser.isPassword
        }).then(function (res) {
            user.removeUser();
            user(res.data);

            $scope.user = user.getUser();
            /* eslint-disable */
        }, function (err) {
            /* eslint-enable */

        });

        delete $scope.user.password;
        delete $scope.user.confirmPassword;
    };

    userForm.delete = function () {
        var confirm = $mdDialog.confirm()
            .title('Would you like to delete your account?')
            .ariaLabel('Confirmation of your account deletion')
            .ok('Please do it!')
            .cancel('No, I will stay!');

        $mdDialog.show(confirm).then(function () {
            auth.user('delete').then(function () {
                authToken.removeToken();

                user.removeUser();

                $state.go('root');
                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */

            });
        }, function () {

        });

    };
}]);
