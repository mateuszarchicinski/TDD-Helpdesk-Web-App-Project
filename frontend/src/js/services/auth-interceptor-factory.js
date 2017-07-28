/**
 * @class angular_module.Module:app.Factory:authInterceptor
 * @description This is an AngularJS factory - interceptor component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>
 * Links to AngularJS factory - interceptor component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * {@link https://docs.angularjs.org/api/ng/service/$http}
 * @example
 * angular.module('app').factory('authInterceptor', [function (){
 *  // Here is place for factory logic
 * }]);
 */


app.factory('authInterceptor', ['authToken', 'user', '$rootScope', '$q', function (authToken, user, $rootScope, $q) {
    var interceptor = {
        request: function (config) {
            var token = authToken.getToken();

            if (token) {
                config.headers.Authorization = 'Bearer ' + token;
            }

            return config;
        },
        requestError: function (reqErr) {
            return $q.reject(reqErr);
        },
        response: function (res) {
            return res;
        },
        responseError: function (resErr) {
            if (resErr.status === 401 && resErr.statusText === 'Unauthorized' && authToken.isAuthenticated()) {
                authToken.removeToken();

                user.removeUser();

                $rootScope.$emit('Unauthorized', resErr.data);
            }

            return $q.reject(resErr);
        }
    };

    return interceptor;
}]);
