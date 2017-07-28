/* global eventMock, authMock */


'use strict';


describe('Controllers: loginCtrl', function () {
    var scope,
        loginCtrl;

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            scope.user = {
                email: 'a@a',
                password: 'aaaaaaaa'
            };

            loginCtrl = $controller('loginCtrl', {
                auth: authMock,
                $scope: scope
            });
        });
    });

    it('ctrl.loginForm should be an object', function () {
        expect(loginCtrl.loginForm).to.be.an('object');
    });

    it('ctrl.loginForm.submit should be a function', function () {
        expect(loginCtrl.loginForm.submit).to.be.an('function');
    });

    it('ctrl.loginForm.submit() should call event.preventDefault() once', function () {
        loginCtrl.loginForm.submit(eventMock);

        expect(eventMock.preventDefault).to.have.been.calledOnce;
    });

    it('ctrl.loginForm.submit() should call once auth.login(user) with correct user object as argument', function () {
        loginCtrl.loginForm.submit(eventMock);

        expect(authMock.login).to.have.been.calledOnce.and.calledWith({
            email: 'a@a',
            password: 'aaaaaaaa'
        });
    });

    it('ctrl.loginViaFacebook should be a function', function () {
        expect(loginCtrl.loginViaFacebook).to.be.a('function');
    });

    it('ctrl.loginViaFacebook should call auth.loginVia("facebook")', function () {
        loginCtrl.loginViaFacebook();

        expect(authMock.loginVia).to.have.been.calledOnce.and.calledWith('facebook');
    });

    it('ctrl.loginViaGoogle should be a function', function () {
        expect(loginCtrl.loginViaGoogle).to.be.a('function');
    });

    it('ctrl.loginViaGoogle should call auth.loginVia("google")', function () {
        loginCtrl.loginViaGoogle();

        expect(authMock.loginVia).to.have.been.calledOnce.and.calledWith('google');
    });
});
