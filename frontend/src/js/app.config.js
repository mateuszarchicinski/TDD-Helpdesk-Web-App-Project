/* eslint no-unused-vars: ["error", { "args": "none" }] */


(function () {

    'use strict';


    app.config(['urlParamsProvider', 'APP_CONFIG', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function (urlParamsProvider, APP_CONFIG, $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        urlParamsProvider.languages = APP_CONFIG.languages;

        var langValue = urlParamsProvider.$get().currentLanguage(),
            baseUrl = '/' + langValue + '/';

        var getTemplateUrl = function (nameFile) {
            return 'views/' + langValue + '/' + nameFile + '.html';
        };

        $stateProvider.state('login', {
            url: baseUrl + 'login',
            templateUrl: getTemplateUrl('login'),
            controller: 'loginController as LC'
        }).state('register', {
            url: baseUrl + 'register',
            templateUrl: getTemplateUrl('register'),
            controller: 'registerController as RC'
        }).state('readme', {
            url: baseUrl + 'helpdesk',
            templateUrl: getTemplateUrl('helpdesk'),
            controller: 'helpdeskController as HC'
        });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('amber');

    }]).constant('APP_CONFIG', {
        languages: ['pl', 'en'] // First element is a default value of language
    }).run(['urlParams', '$rootScope', '$state', function (urlParams, $rootScope, $state) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            console.log('Event:', '$stateChangeStart');
            
            if (toState.redirectTo) {
                event.preventDefault();

                $state.go(toState.redirectTo, toParams);
            }
        });

    }]);

})();
