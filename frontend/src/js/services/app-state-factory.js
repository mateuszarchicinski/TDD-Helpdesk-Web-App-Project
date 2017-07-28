/**
 * @class angular_module.Module:app.Factory:appState
 * @description This is an AngularJS factory component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS factory component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').factory('appState', [function (){
 *  // Here is place for factory logic
 * }]);
 */


app.factory('appState', ['urlParams', 'authToken', function (urlParams, authToken) {
    var appState = {};

    /**
     * @property language {String} This property returns current application language
     * @memberOf angular_module.Module:app.Factory:appState
     * @example
     * angular.module('app').controller('exampleCtrl', ['appState', function (appState){
     *  appState.language;
     * }]);
     */


    appState.language = urlParams.currentLanguage;


    /**
     * @property isAuthorized {Boolean} This property returns current application state of user authorization
     * @memberOf angular_module.Module:app.Factory:appState
     * @example
     * angular.module('app').controller('exampleCtrl', ['appState', function (appState){
     *  appState.isAuthorized;
     * }]);
     */


    appState.isAuthorized = authToken.isAuthenticated;

    return appState;
}]);
