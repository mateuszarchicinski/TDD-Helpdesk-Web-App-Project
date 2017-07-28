/**
 * @class angular_module.Module:app.Factory:user
 * @description This is an AngularJS factory component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS factory component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').factory('user', [function (){
 *  // Here is place for factory logic
 * }]);
 */


app.factory('user', ['SCHEMAS_CONFIG', function (SCHEMAS_CONFIG) {
    var userData = null,
        userSchema = SCHEMAS_CONFIG.user;


    /**
     * @function user
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method creates a user object which will be sharing data between application components
     * @param {Object} data Required param to set user data object
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user({
     *   firstName: 'Mateusz'
     *  });
     * }]);
     */


    function user(data) {
        if (userData !== null || typeof data !== 'object' || !data.firstName) {
            return false;
        }

        userData = data;
    }


    /**
     * @function user&sdot;set
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to set value in user object
     * @param {String} property Required param to pass name of property
     * @param {(Number|String|Boolean|Object)} value Required param to pass value
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.set('my-issues', myIssues);
     * }]);
     */


    user.set = function (property, value) {
        if (!userData) {
            return false;
        }

        userData[property] = value;
    };


    /**
     * @function user&sdot;get
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to get value from user object
     * @param {String} property Required param to pass name of property
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.get('my-issues');
     * }]);
     */


    user.get = function (property) {
        if (!userData) {
            return null;
        }

        return userData[property];
    };


    /**
     * @function user&sdot;remove
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to remove value from user object
     * @param {String} property Required param to pass name of property
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.remove('my-issues');
     * }]);
     */


    user.remove = function (property) {
        if (!userData) {
            return false;
        }

        delete userData[property];
    };


    /**
     * @function user&sdot;getUser
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to get only user data as object
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.getUser();
     * }]);
     */


    user.getUser = function () {
        if (!userData) {
            return null;
        }

        var properties = Object.keys(userSchema),
            data = {};

        for (var i in properties) {
            var value = userData[properties[i]];

            if (value) {
                data[properties[i]] = value;
            }
        }

        return data;
    };


    /**
     * @function user&sdot;removeUser
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to remove user data object
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.removeUser();
     * }]);
     */


    user.removeUser = function () {
        if (userData) {
            userData = null;
        }
    };


    /**
     * @function user&sdot;isUser
     * @memberOf angular_module.Module:app.Factory:user
     * @instance
     * @description This method is used to check if user data object is set
     * @example
     * angular.module('app').controller('exampleCtrl', ['user', function (user){
     *  user.isUser();
     * }]);
     */


    user.isUser = function () {
        return !!userData;
    };

    return user;
}]);
