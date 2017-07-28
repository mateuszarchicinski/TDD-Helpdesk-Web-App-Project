/**
 * @class angular_module.Module:app.Factory:authToken
 * @description This is an AngularJS factory component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS factory component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').factory('authToken', [function (){
 *  // Here is place for factory logic
 * }]);
 */


app.factory('authToken', ['$window', 'APP_CONFIG', function ($window, APP_CONFIG) {
    var localStorage = $window.localStorage,
        cachedToken,
        tokenConfig = APP_CONFIG.tokenConfig,
        prefixToken = tokenConfig.prefix || 'HDA',
        nameToken = tokenConfig.name || 'userToken',
        headerToken = tokenConfig.header || 'Authorization',
        typeToken = tokenConfig.type || 'Bearer',
        fullNameToken = prefixToken + '-' + nameToken;


    /**
     * @property authToken&sdot;config {Object} This property returns object with token configuration properties: prefix, name, fullName, header and type
     * @memberOf angular_module.Module:app.Factory:authToken
     * @example
     * angular.module('app').controller('exampleCtrl', ['authToken', function (authToken){
     *  authToken.config;
     * }]);
     */


    var config = {
        prefix: prefixToken,
        name: nameToken,
        fullName: fullNameToken,
        header: headerToken,
        type: typeToken
    };


    /**
     * @function authToken&sdot;setToken
     * @memberOf angular_module.Module:app.Factory:authToken
     * @instance
     * @description This method is used to set a user authorization token
     * @param {String} token Required param to pass authoorization token
     * @example
     * angular.module('app').controller('exampleCtrl', ['authToken', function (authToken){
     *  authToken.setToken(token);
     * }]);
     */


    var setToken = function (token) {
        cachedToken = token;

        localStorage.setItem(fullNameToken, token);
    };


    /**
     * @function authToken&sdot;get
     * @memberOf angular_module.Module:app.Factory:authToken
     * @instance
     * @description This method is used to get a user authorization token
     * @example
     * angular.module('app').controller('exampleCtrl', ['authToken', function (authToken){
     *  authToken.getToken();
     * }]);
     */


    var getToken = function () {
        if (!cachedToken) {
            cachedToken = localStorage.getItem(fullNameToken);
        }

        return cachedToken;
    };


    /**
     * @function authToken&sdot;removeToken
     * @memberOf angular_module.Module:app.Factory:authToken
     * @instance
     * @description This method is used to remove a user authorization token
     * @example
     * angular.module('app').controller('exampleCtrl', ['authToken', function (authToken){
     *  authToken.removeToken();
     * }]);
     */


    var removeToken = function () {
        cachedToken = null;

        localStorage.removeItem(fullNameToken);
    };


    /**
     * @function authToken&sdot;isAuthenticated
     * @memberOf angular_module.Module:app.Factory:authToken
     * @instance
     * @description This method is used to check if a user authorization token is set
     * @example
     * angular.module('app').controller('exampleCtrl', ['authToken', function (authToken){
     *  authToken.isAuthenticated();
     * }]);
     */


    var isAuthenticated = function () {
        return !!getToken();
    };

    return {
        config: config,
        setToken: setToken,
        getToken: getToken,
        removeToken: removeToken,
        isAuthenticated: isAuthenticated
    };
}]);
