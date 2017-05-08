/* eslint no-unused-vars: ["error", { "args": "none" }] */


app.config(['urlParamsProvider', 'APP_CONFIG', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function (urlParamsProvider, APP_CONFIG, $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

    urlParamsProvider.languages = APP_CONFIG.languages;

    var langValue = urlParamsProvider.$get().currentLanguage(),
        baseUrl = '/' + langValue + '/';

    var getTemplateUrl = function (nameFile) {
        return 'views/' + langValue + '/_' + nameFile + '.html';
    };

    $stateProvider.state('root', {
        url: '/',
        controller: 'rootController as RC'
    }).state('login', {
        url: baseUrl + 'login',
        templateUrl: getTemplateUrl('login'),
        controller: 'loginController as LC'
    }).state('register', {
        url: baseUrl + 'register',
        templateUrl: getTemplateUrl('register'),
        controller: 'registerController as RC'
    }).state('helpdesk', {
        url: baseUrl + 'helpdesk/:service',
        templateUrl: getTemplateUrl('helpdesk'),
        controller: 'helpdeskController as HC',
        authRequired: true
    });

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('amber');

}]).constant('APP_CONFIG', {
    languages: ['pl', 'en'] // First element is a default value of language
}).run(['$rootScope', 'appState', '$state', function ($rootScope, appState, $state) {

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
        if (!appState.isAuthorized() && toState.authRequired) {
            event.preventDefault();

            $state.go('root', {});
        }
    });

}]);
