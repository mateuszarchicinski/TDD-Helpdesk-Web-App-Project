/* eslint no-unused-vars: ["error", { "args": "none" }] */


(function () {

    /*!
     *
     * Application Config
     *
     * Required:
     * - 
     *
     */

    var appConfig = {
        languages: [
            'pl',
            'en'
        ],
        routes: [
            {
                name: 'root',
                url: '/',
                controller: 'rootController as RC',
                baseUrl: false,
                otherwise: true
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
        ],
        apiConfig: {
            baseUrl: 'http://localhost:4848/',
            loginUrl: '',
            registerUrl: '',
            loginVia: {
                facebookUrl: '',
                googleUrl: ''
            }
        },
        tokenConfig: {
            prefix: '',
            name: '',
            header: '',
            type: ''
        },
        facebook: {
            clientId: '1041741079292895'
        },
        google: {
            clientId: '682202059730-pkdrp02no3d8ueiecq4i7tqnnmqkrtoh.apps.googleusercontent.com'
        }
    };


    app.config(['urlParamsProvider', 'routesInjectorProvider', 'APP_CONFIG', '$httpProvider', '$mdThemingProvider', function (urlParamsProvider, routesInjectorProvider, APP_CONFIG, $httpProvider, $mdThemingProvider) {

        /*!
         *
         * urlParamsProvider Setup
         *
         * Reqiured:
         * - languages property, which must be an array with languages codes e.g. ['pl', 'en']
         *
         */

        urlParamsProvider.languages = APP_CONFIG.languages;


        /*!
         *
         * routesInjectorProvider Setup
         *
         * Required:
         * - languagePrefix property, which must be a string with language code provided from current url address,
         * - routes property, which must be an array with routes objects, an example below:
         * [
         *   {
         *     name:         'root',                 - name of the route
         *     url:          '/',                    - under that URL the route will be available
         *     templateName: 'root',                 - it creates templateUrl property with correct language prefix and file extension e.g. 'views/LANGUAGE_PREFIX/_TEMPLATE_NAME.html'
         *     controller:   'rootController as RC', - name of the controller which is already registered
         *     baseUrl:      false,                  - if true then URL property is changed to '/LANGUAGE_PREFIX/URL'
         *     authRequired: false                   - this informs app, that route requires user authorization
         *     otherwise:    true                    - will redirects all unregistered routes to the route with property otherwise: true
         *   }
         * ]
         *
         */

        routesInjectorProvider.inject({
            languagePrefix: urlParamsProvider.currentLanguage(),
            routes: APP_CONFIG.routes
        });


        /*!
         *
         * $httpProvider Setup
         *
         */

        $httpProvider.interceptors.push('authInterceptor');


        /*!
         *
         * $mdThemingProvider Setup
         *
         */

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('amber');

    }]).constant('APP_CONFIG', appConfig).run(['$window', '$rootScope', '$state', 'appState', function ($window, $rootScope, $state, appState) {

        /*!
         *
         * To catch URL params from Facebook & Google login windows.
         *
         */

        var params = $window.location.search.substring(1);

        if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
            var code = decodeURIComponent(params.split('=')[1]);

            $window.opener.postMessage({
                loginVia: true,
                code: code
            }, $window.location.origin);
        }


        /*!
         *
         * Event on $stateChangeStart - Emittet by UI-Router Module.
         *
         * Discription:
         * - Is checking the user authorization to make sure that user have access to requested route.
         *
         */

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            if (!appState.isAuthorized() && toState.authRequired) {
                event.preventDefault();

                $state.go('root');
            }
        });


        /*!
         *
         * Event on Unauthorized - Emittet by AuthInterceptorFactory.
         *
         * Discription:
         * - Is doing the same as on $stateChangeStart event.
         */

        $rootScope.$on('Unautorized', function (event, data) {
            if (!appState.isAuthorized() && $state.current.authRequired) {
                event.preventDefault();

                $state.go('root');
            }
        });

    }]);

})();
