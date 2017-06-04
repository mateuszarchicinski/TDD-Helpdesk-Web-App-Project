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
                abstract: true,
                name: 'helpdesk',
                url: '/helpdesk',
                templateName: 'helpdesk',
                controller: 'helpdeskController as HC',
                authRequired: true
            },
            {
                name: 'helpdesk.dashboard',
                url: '/dashboard',
                authRequired: true,
                views: {
                    'service': {
                        templateName: 'dashboardService',
                        controller: 'dashboardController as DC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Dashboard'
                }
            },
            {
                name: 'helpdesk.reportIssue',
                url: '/report-issue',
                authRequired: true,
                views: {
                    'service': {
                        templateName: 'report_issue_service',
                        controller: 'report_issue as RI'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Report Issue'
                }
            },
            {
                name: 'helpdesk.myIssues',
                url: '/my-issues',
                authRequired: true,
                views: {
                    service: {
                        templateName: 'my_issues_service',
                        controller: 'my_issues as MI'
                    }
                },
                ncyBreadcrumb: {
                    label: 'My Issues'
                }
            },
            {
                name: 'helpdesk.myIssues.issue',
                url: '/:_id',
                authRequired: true,
                views: {
                    'service@helpdesk': {
                        templateName: 'issue-service',
                        controller: 'issueCtrl as IC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Issue: {{issue._id}}'
                },
                params: {
                    _id: null,
                    _createdBy: null,
                    postDate: null,
                    subject: null,
                    category: null,
                    description: null,
                    status: null,
                    notes: null
                }
            },
            {
                name: 'helpdesk.reportedIssues',
                url: '/reported-issues',
                authRequired: true,
                views: {
                    service: {
                        templateName: 'reported-issues',
                        controller: 'reportedIssuesCtrl as RIC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Reported Issues'
                }
            },
            {
                name: 'helpdesk.reportedIssues.issue',
                url: '/:_id',
                authRequired: true,
                views: {
                    'service@helpdesk': {
                        templateName: 'issue-service',
                        controller: 'issueCtrl as IC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Issue: {{issue._id}}'
                },
                params: {
                    _id: null,
                    _createdBy: null,
                    postDate: null,
                    subject: null,
                    category: null,
                    description: null,
                    status: null,
                    notes: null
                }
            },
            {
                name: 'helpdesk.users',
                url: '/users',
                authRequired: true,
                views: {
                    service: {
                        templateName: 'users',
                        controller: 'usersCtrl as UC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Users'
                }
            },
            {
                name: 'helpdesk.users.user',
                url: '/:_id',
                authRequired: true,
                views: {
                    'service@helpdesk': {
                        templateName: 'user',
                        controller: 'userCtrl as UC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'User: {{UC.user._id}}'
                },
                params: {
                    _id: null,
                    firstName: null,
                    lastName: null,
                    fullName: null,
                    gender: null,
                    email: null,
                    isPassword: null,
                    role: null,
                    active: null,
                    locale: null
                }
            },
            {
                name: 'helpdesk.myAccount',
                url: '/my-account',
                authRequired: true,
                views: {
                    'service': {
                        templateName: 'myAccountService',
                        controller: 'myAccountController as MAC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'My Account'
                }
            },
            {
                name: 'helpdesk.logout',
                url: '/logout',
                authRequired: true,
                views: {
                    'service': {
                        controller: 'logoutController as LC'
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                }
            }
        ],
        apiConfig: {
            baseUrl: 'http://192.168.1.21:4848/',
            registerUrl: '',
            loginUrl: '',
            logoutUrl: '',
            userUrl: '',
            issueUrl: '',
            issuesUrl: '',
            noteUrl: '',
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
            if (toState.name !== 'root' && ((!appState.isAuthorized() && toState.authRequired) || (appState.isAuthorized() && !toState.authRequired))) {
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

        $rootScope.$on('Unauthorized', function (event, data) {
            if (!appState.isAuthorized() && $state.current.authRequired) {
                event.preventDefault();

                $state.go('root');
            }
        });

    }]);

})();
