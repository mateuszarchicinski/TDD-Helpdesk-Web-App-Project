/* eslint no-unused-vars: ["error", { "args": "none" }] */


(function () {

    var routes = [
        {
            name: 'root',
            url: '/',
            controller: 'rootController as RC',
            baseUrl: false
        },
        {
            name: 'login',
            url: '/login',
            templateName: 'login',
            controller: 'loginController as LC'
        },
        {
            name: 'register',
            url: '/register',
            templateName: 'register',
            controller: 'registerController as RC'
        },
        {
            name: 'helpdesk',
            url: '/helpdesk/:service',
            templateName: 'helpdesk',
            controller: 'helpdeskController as HC',
            authRequired: true
        }
    ];

    app.config(['urlParamsProvider', 'APP_CONFIG', '$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', function (urlParamsProvider, APP_CONFIG, $stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {

        urlParamsProvider.languages = APP_CONFIG.languages;

        var lang = urlParamsProvider.$get().currentLanguage(),
            routes = APP_CONFIG.routes;

        var getUrl = function (url) {
            return '/' + lang + url;
        };

        var getTemplateUrl = function (templateName) {
            return 'views/' + lang + '/_' + templateName + '.html';
        };

        for (var i in routes) {
            if (routes[i].baseUrl !== false) {
                routes[i].url = getUrl(routes[i].url);
            }

            if (routes[i].templateName) {
                routes[i].templateUrl = getTemplateUrl(routes[i].templateName);
            }

            $stateProvider.state(routes[i]);
        }

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('amber');

    }]).constant('APP_CONFIG', {
        languages: ['pl', 'en'], // First element is a default value of language
        routes: routes
    }).run(['$rootScope', '$state', 'appState', function ($rootScope, $state, appState) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (!appState.isAuthorized() && toState.authRequired) {
                event.preventDefault();

                $state.go('root');
            }
        });

    }]);

})();
