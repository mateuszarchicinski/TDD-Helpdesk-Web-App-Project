/**
 * @class angular_module.Module:app.Controller:languageSettingsCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'languageSettingsCtrl as LSC'
 * }
 * @example
 * <div ng-controller="languageSettingsCtrl as LSC"></div>
 */


app.controller('languageSettingsCtrl', ['urlParams', '$window', function (urlParams, $window) {
    /**
     * @property language {String} This property returns current language code
     * @memberOf angular_module.Module:app.Controller:languageSettingsCtrl
     * @example
     * this.language
     * @example
     * <span>{{LSC.language}}</span>
     */


    this.language = this.language || urlParams.currentLanguage();


    /**
     * @function translate
     * @memberOf angular_module.Module:app.Controller:languageSettingsCtrl
     * @instance
     * @description This method provides support for multiple languages changing during reloading app view
     * @param {String} langCode Required param of language code that indicates language to translate app view
     * @example
     * this.translate('pl');
     * this.translate('en');
     * @example
     * <button ng-click="LSC.translate('pl')">PL</button>
     * <button ng-click="LSC.translate('en')">EN</button>
     */


    this.translate = function (langCode) {
        if (this.language !== langCode) {
            $window.location.href = '/' + langCode + urlParams.rightPath();
        }
    };
}]);
