/**
 * @class angular_module.Module:app.Config:appConfig
 * @description This is an AngularJS config component, can be defined in JavaScript source file
 * @example
 * angular.module('app').config([function() {
 *  // Application configuration here
 * }]);
 */


(function () {

    /*!
     *
     * Schemas Config
     *
     */

    var schemasConfig = {
        issue: {
            _id: null,
            _createdBy: null,
            postDate: null,
            subject: null,
            category: null,
            description: null,
            status: null,
            notes: null,
            created: null,
            updated: null
        },
        user: {
            _id: null,
            firstName: null,
            lastName: null,
            fullName: null,
            gender: null,
            pictures: null,
            email: null,
            isPassword: null,
            role: null,
            active: null,
            locale: null,
            created: null,
            updated: null
        }
    };


    /*!
     *
     * Application Config
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
                baseUrl: false,
                otherwise: true,
                views: {
                    main: {
                        controller: 'rootCtrl as RC'
                    }
                }
            },
            {
                name: 'register',
                url: '/register',
                views: {
                    main: {
                        templateName: 'register',
                        controller: 'registerCtrl as RC'
                    }
                }
            },
            {
                name: 'login',
                url: '/login',
                views: {
                    main: {
                        templateName: 'login',
                        controller: 'loginCtrl as LC'
                    }
                }
            },
            {
                abstract: true,
                name: 'helpdesk',
                url: '/helpdesk',
                authRequired: true,
                views: {
                    main: {
                        templateName: 'helpdesk',
                        controller: 'helpdeskCtrl as HC'
                    }
                }
            },
            {
                name: 'helpdesk.dashboard',
                url: '/dashboard',
                authRequired: true,
                views: {
                    services: {
                        templateName: 'dashboard-service',
                        controller: 'dashboardCtrl as DC'
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
                    services: {
                        templateName: 'report-issue-service',
                        controller: 'reportIssueCtrl as RIC'
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
                    services: {
                        templateName: 'my-issues-service',
                        controller: 'myIssuesCtrl as MIC'
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
                    'services@helpdesk': {
                        templateName: 'issue-service',
                        controller: 'issueCtrl as IC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Issue: {{issue._id}}'
                },
                params: schemasConfig.issue
            },
            {
                name: 'helpdesk.reportedIssues',
                url: '/reported-issues',
                authRequired: true,
                views: {
                    services: {
                        templateName: 'reported-issues-service',
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
                    'services@helpdesk': {
                        templateName: 'issue-service',
                        controller: 'issueCtrl as IC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Issue: {{issue._id}}'
                },
                params: schemasConfig.issue
            },
            {
                name: 'helpdesk.users',
                url: '/users',
                authRequired: true,
                views: {
                    services: {
                        templateName: 'users-service',
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
                    'services@helpdesk': {
                        templateName: 'user-service',
                        controller: 'userCtrl as UC'
                    }
                },
                ncyBreadcrumb: {
                    label: 'User: {{crrUser._id}}'
                },
                params: schemasConfig.user
            },
            {
                name: 'helpdesk.myAccount',
                url: '/my-account',
                authRequired: true,
                views: {
                    services: {
                        templateName: 'my-account-service',
                        controller: 'myAccountCtrl as MAC'
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
                    services: {
                        controller: 'logoutCtrl as LC'
                    }
                },
                ncyBreadcrumb: {
                    skip: true
                }
            }
        ],
        apiConfig: {
            baseUrl: '',
            registerUrl: '',
            loginUrl: '',
            logoutUrl: '',
            userUrl: '',
            usersUrl: '',
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

    }]).constant('SCHEMAS_CONFIG', schemasConfig).constant('APP_CONFIG', appConfig).run(['$window', '$rootScope', '$state', 'appState', function ($window, $rootScope, $state, appState) {

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

        /* eslint-disable */
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            /* eslint-enable */
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

        /* eslint-disable */
        $rootScope.$on('Unauthorized', function (event, data) {
            /* eslint-enable */
            if (!appState.isAuthorized() && $state.current.authRequired) {
                event.preventDefault();

                $state.go('root');
            }
        });

    }]);

})();
