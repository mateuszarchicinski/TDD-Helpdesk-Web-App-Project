/**
 * @class angular_module.Module:app.Provider:routesInjector
 * @description This is an AngularJS provider component, can be defined in JavaScript source file as a extension to AngularJS application module
 * <br>Link to AngularJS provider component documentation:
 * {@link https://docs.angularjs.org/guide/providers}
 * @example
 * angular.module('app').provider('routesInjector', [function (){
 *  // Here is place for provider logic
 * }]);
 */


app.provider('routesInjector', ['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    function templateUrl(lang, name) {
        return 'views/' + lang + '/_' + name + '.html';
    }


    /**
     * @function routesInjector&sdot;inject
     * @memberOf angular_module.Module:app.Provider:routesInjector
     * @instance
     * @description This method injects routes to application at runtime
     * @param {Object} config Required param to pass object with properties languagePrefix (String) and routes (Array)
     * @example
     * angular.module('app').config(['routesInjectorProvider', function (routesInjectorProvider){
     *   routesInjectorProvider.inject({
     *     languagePrefix: 'pl',
     *     routes: [{
     *       name: 'root',
     *       url: '/',
     *       baseUrl: false,
     *       otherwise: true,
     *       views: {
     *         main: {
     *           controller: 'rootCtrl as RC'
     *         }
     *       }
     *     }]
     *   });
     * }]);
     */


    function inject(config) {
        if (typeof config !== 'object') {
            return;
        }

        var routes = config.routes || [],
            languagePrefix = config.languagePrefix || 'pl';

        for (var i in routes) {
            var route = routes[i];

            if (route.baseUrl !== false && route.name.indexOf('.') === -1) {
                route.url = '/' + languagePrefix + route.url;
            }

            if (route.templateName) {
                route.templateUrl = templateUrl(languagePrefix, route.templateName);
            }

            var views = route.views;

            if (views) {
                for (var j in views) {
                    var view = views[j];

                    if (view.templateName) {
                        view.templateUrl = templateUrl(languagePrefix, view.templateName);
                    }
                }
            }

            $stateProvider.state(route);

            if (route.otherwise) {
                $urlRouterProvider.otherwise(route.url);
            }
        }
    }

    // $locationProvider Setup to turn on html5Mode ---> https://docs.angularjs.org/api/ng/provider/$locationProvider
    $locationProvider.html5Mode(true);

    this.inject = inject;

    this.$get = function () {
        return {};
    };
}]);
