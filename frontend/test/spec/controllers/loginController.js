'use strict';


describe('Controllers: loginController', function () {
    var eventMock,
        authMock,
        scope,
        loginController;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $rootScope) {
            eventMock = {
                preventDefault: function () {}
            };
            authMock = {
                login: function () {},
                loginVia: function () {}
            };

            sinon.spy(eventMock, 'preventDefault');
            sinon.spy(authMock, 'login');
            sinon.spy(authMock, 'loginVia');

            scope = $rootScope.$new();
            scope.email = 'a@a';
            scope.password = 'aaaaaaaa';

            loginController = $controller('loginController', {
                auth: authMock,
                $scope: scope
            });
        });
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

    it('ctrl.loginForm.submit() should call auth.login(user) with correct user object as argument', function () {
        loginController.loginForm.submit(eventMock);

        expect(authMock.login).to.have.been.calledWith({
            email: 'a@a',
            password: 'aaaaaaaa'
        });
    });

    it('ctrl.loginVia should be a function', function () {
        expect(loginController.loginVia).to.be.a('function');
    });
});
