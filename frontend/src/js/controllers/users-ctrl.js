/**
 * @class angular_module.Module:app.Controller:usersCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'usersCtrl as UC'
 * }
 * @example
 * <div ng-controller="usersCtrl as UC"></div>
 */


app.controller('usersCtrl', ['sendRequest', 'user', '$scope', function (sendRequest, user, $scope) {
    var users;

    sendRequest('users').then(function (res) {
        user.set('users', res.data);

        users = $scope.users = user.get('users') || res.data || [];

        /* eslint-disable */
    }, function (err) {
        /* eslint-enable */
    });


    /**
     * @function givePermissions
     * @memberOf angular_module.Module:app.Controller:usersCtrl
     * @instance
     * @description This method is used to giveing permissions to user
     * @param {Object} user Required param to indicate in which user object will permissions changed
     * @param {String} permissions Required param to define user permissions level. They are three levels available: user/assistant/admin
     * @example
     * this.givePermissions(user, 'user');
     * this.givePermissions(user, 'assistant');
     * this.givePermissions(user, 'admin');
     * @example
     * <button ng-click="UC.givePermissions(user, 'user')">Give user permissions</button>
     * <button ng-click="UC.givePermissions(user, 'assistant')">Give assistant permissions</button>
     * <button ng-click="UC.givePermissions(user, 'admin')">Give admin permissions</button>
     */


    this.givePermissions = function (user, permissions) {
        var roles = ['user', 'assistant', 'admin'];

        if (roles.indexOf(permissions) === -1) {
            return;
        }

        /* eslint-disable */
        sendRequest('user.update', {
            _id: user._id,
            role: permissions
        }).then(function (res) {
            user.role = permissions;
        }, function (err) {});
        /* eslint-enable */
    };


    /**
     * @function removeUser
     * @memberOf angular_module.Module:app.Controller:usersCtrl
     * @instance
     * @description This method is used to remove user
     * @param {Object} issue Required param to indicate which user object needs to be removed
     * @example
     * this.removeUser(user);
     * @example
     * <button ng-click="UC.removeUser(user)">Remove User</button>
     */


    this.removeUser = function (user) {
        /* eslint-disable */
        sendRequest('user.delete', user).then(function (res) {}, function (err) {
            if (err.status === 410) {
                users.splice(users.indexOf(user), 1);
            }
        });
        /* eslint-enable */
    };
}]);
