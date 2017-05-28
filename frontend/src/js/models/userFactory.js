app.factory('user', [function () {
    var userData = null;

    function user(data) {
        if (userData !== null || typeof data !== 'object' || !data.firstName) {
            return false;
        }

        userData = data;
    }

    user.set = function (property, value) {
        if (!userData) {
            return false;
        }

        userData[property] = value;
    };

    user.get = function (property) {
        if (!userData) {
            return null;
        }

        return userData[property];
    };

    user.remove = function (property) {
        if (!userData) {
            return false;
        }

        delete userData[property];
    };

    user.getUser = function () {
        return userData;
    };

    user.removeUser = function () {
        userData = null;
    };

    user.isUser = function () {
        return !!userData;
    };

    return user;
}]);
