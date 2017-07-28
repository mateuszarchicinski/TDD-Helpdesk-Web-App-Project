'use strict';


describe('Services: routesInjectorProvider', function () {
    var routesInjectorProvider,
        routesInjector,
        routesArrayMock,
        stateProvider,
        urlRouterProvider,
        locationProvider;

    beforeEach(module(function ($locationProvider) {
        locationProvider = $locationProvider;

        sinon.spy(locationProvider, 'html5Mode');
    }));

    beforeEach(module('app'));

    beforeEach(module(function (_routesInjectorProvider_, $stateProvider, $urlRouterProvider) {
        routesInjectorProvider = _routesInjectorProvider_;

        stateProvider = $stateProvider;
        urlRouterProvider = $urlRouterProvider;

        sinon.spy(stateProvider, 'state');
        sinon.spy(urlRouterProvider, 'otherwise');
    }));

    beforeEach(inject(function (_routesInjector_) {
        routesInjector = _routesInjector_;
    }));

    beforeEach(function () {
        routesArrayMock = [
            {
                name: 'testRoute1',
                url: '/testRoute1',
                templateName: 'testRoute1',
                controller: 'testRoute1',
                otherwise: true
            },
            {
                name: 'testRoute2',
                url: '/testRoute2',
                controller: 'testRoute2',
                baseUrl: false
            },
            {
                name: 'testRoute2.news',
                url: '/news',
                views: {
                    one: {
                        templateName: 'newOne',
                        controller: 'newOneCtrl'
                    },
                    two: {
                        controller: 'newTwoCtrl'
                    }
                }
            }
        ];

        routesInjectorProvider.inject({
            languagePrefix: 'pl',
            routes: routesArrayMock
        });
    });

    it('routesInjector should return an empty object', function () {
        expect(routesInjector).to.deep.equal({});
    });

    it('routesInjectorProvider.inject() should return undefined', function () {
        expect(routesInjectorProvider.inject()).to.be.undefined;
    });

    it('routesInjectorProvider.inject(config) should correctly modified routes objects', function () {
        expect(routesArrayMock[0]).to.deep.equal({
            name: 'testRoute1',
            url: '/pl/testRoute1',
            templateName: 'testRoute1',
            templateUrl: 'views/pl/_testRoute1.html',
            controller: 'testRoute1',
            otherwise: true
        });

        expect(routesArrayMock[1]).to.deep.equal({
            name: 'testRoute2',
            url: '/testRoute2',
            controller: 'testRoute2',
            baseUrl: false
        });

        delete routesArrayMock[2].views.one.resolveAs;
        delete routesArrayMock[2].views.two.resolveAs;

        expect(routesArrayMock[2]).to.deep.equal({
            name: 'testRoute2.news',
            url: '/news',
            views: {
                one: {
                    templateName: 'newOne',
                    templateUrl: 'views/pl/_newOne.html',
                    controller: 'newOneCtrl'
                },
                two: {
                    controller: 'newTwoCtrl'
                }
            }
        });
    });

    it('routesInjectorProvider.inject(config) should call $stateProvider.state(route)', function () {
        expect(stateProvider.state).to.have.been.calledWith(routesArrayMock[0]);
        expect(stateProvider.state).to.have.been.calledWith(routesArrayMock[1]);
    });

    it('routesInjectorProvider.inject(config) should call $urlRouterProvider.otherwise(route.url)', function () {
        expect(urlRouterProvider.otherwise).to.have.been.calledWith(routesArrayMock[0].url);
    });

    it('routesInjectorProvider.inject(config) should call locationProvider.html5Mode(true)', function () {
        expect(locationProvider.html5Mode).to.have.been.calledWith(true);
    });
});
