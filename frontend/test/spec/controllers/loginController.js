'use strict';


describe('Controllers: loginController', function () {
    var loginController,
        eventMock,
        scope;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            loginController = $controller('loginController', {
                $scope: scope
            });

            eventMock = {
                preventDefault: function () {}
            };

            sinon.spy(eventMock, 'preventDefault');
        });
    });

    afterEach(function () {
        eventMock.preventDefault.restore();
    });

    it('ctrl.loginForm should be an object', function () {
        expect(loginController.loginForm).to.be.an('object');
    });

    it('ctrl.loginForm.submit should be a function', function () {
        expect(loginController.loginForm.submit).to.be.an('function');
    });

    it('ctrl.loginForm.submit() should call event.preventDefault() once', function () {
        loginController.loginForm.submit(eventMock);

        expect(eventMock.preventDefault).to.have.been.calledOnce;
    });

    it('ctrl.loginVia should be a function', function () {
        expect(loginController.loginVia).to.be.a('function');
    });
});
