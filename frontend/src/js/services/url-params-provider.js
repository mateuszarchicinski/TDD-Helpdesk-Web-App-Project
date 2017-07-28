/**
 * @class angular_module.Module:app.Provider:urlParams
 * @description This is an AngularJS provider component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS provider component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').provider('urlParams', [function (){
 *  // Here is place for provider logic
 * }]);
 */


app.provider('urlParams', ['$windowProvider', function ($windowProvider) {
    var self = this;

    function getParams() {
        var window = $windowProvider.$get();

        return {
            location: window.location,
            langValue: window.location.pathname.split('/')[1]
        };
    }


    /**
     * @function currentLanguage
     * @memberOf angular_module.Module:app.Provider:urlParams
     * @instance
     * @description This method returns current language code from URL address
     * @example
     * angular.module('app').controller('exampleCtrl', ['urlParams', function (urlParams){
     *  urlParams.currentLanguage();
     * }]);
     */


    function currentLanguage() {
        var lang = getParams().langValue;

        return self.languages.indexOf(lang) === -1 ? self.languages[0] : lang;
    }


    /**
     * @function rightPath
     * @memberOf angular_module.Module:app.Provider:urlParams
     * @instance
     * @description This method returns right path of URL address after language code part
     * @example
     * angular.module('app').controller('exampleCtrl', ['urlParams', function (urlParams){
     *  urlParams.rightPath();
     * }]);
     */


    function rightPath() {
        var location = getParams().location;

        return location.pathname.substring(currentLanguage().length + 1) + location.search;
    }


    /**
     * @property languages {Array} This property is used to set an array of available application languages and can be modified only in AngularJS application config
     * @memberOf angular_module.Module:app.Provider:urlParams
     * @example
     * angular.module('app').config(['urlParamsProvider', function (urlParamsProvider){
     *  urlParamsProvider.languages = ['pl', 'en'];
     * }]);
     */


    this.languages = ['pl'];

    this.currentLanguage = currentLanguage;

    this.$get = function () {
        return {
            currentLanguage: currentLanguage,
            rightPath: rightPath
        };
    };
}]);
