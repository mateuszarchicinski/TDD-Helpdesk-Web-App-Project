/* global eventMock, authMock, successRes, errorCallbackSpy, errorRes */


'use strict';


describe('Controllers: loginController', function () {
    var scope,
        authToken,
        userSpy,
        state,
        loginController;

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, _authToken_, $state, $controller) {
            authToken = _authToken_;
            state = $state;

            sinon.spy(authToken, 'setToken');
            userSpy = sinon.spy();
            sinon.spy(state, 'go');

            scope = $rootScope.$new();
            scope.email = 'a@a';
            scope.password = 'aaaaaaaa';

            loginController = $controller('loginController', {
                auth: authMock,
                $scope: scope,
                user: userSpy
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

    it('ctrl.loginForm.submit() on success response should save user token/user data & redirect to helpdesk state', function () {
        authMock.statusLog = true;

        loginController.loginForm.submit(eventMock);

        expect(authToken.setToken).to.have.been.calledWith(successRes.data.token);
        expect(userSpy).to.have.been.calledWith(successRes.data);
        expect(state.go).to.have.been.calledWith('helpdesk.dashboard');
    });

    it('ctrl.loginForm.submit() on success response (without token) should do nothing', function () {
        authMock.statusLog = true;
        /* eslint-disable */
        successRes = {
            data: {}
        };
        /* eslint-enable */

        loginController.loginForm.submit(eventMock);

        expect(authToken.setToken).to.not.have.been.called;
        expect(userSpy).to.not.have.been.called;
        expect(state.go).to.not.have.been.called;
    });

    it('ctrl.loginForm.submit() on error response should call errorCallback(err)', function () {
        loginController.loginForm.submit(eventMock);

        expect(errorCallbackSpy).to.have.been.calledWith(errorRes);
    });

    it('ctrl.loginViaFacebook should be a function', function () {
        expect(loginController.loginViaFacebook).to.be.a('function');
    });

    it('ctrl.loginViaFacebook should be a function', function () {
        expect(loginController.loginViaFacebook).to.be.a('function');
    });

    it('ctrl.loginViaGoogle should be a function', function () {
        expect(loginController.loginViaGoogle).to.be.a('function');
    });

    it('ctrl.loginViaFacebook & ctrl.loginViaGoogle() on success response should save user token/user data & redirect to helpdesk state', function () {
        authMock.statusVia = true;

        loginController.loginViaFacebook();
        loginController.loginViaGoogle();

        expect(authToken.setToken).to.have.been.calledWith(successRes.data.token).and.calledTwice;
        expect(userSpy).to.have.been.calledWith(successRes.data).and.calledTwice;
        expect(state.go).to.have.been.calledWith('helpdesk.dashboard').and.calledTwice;
    });

    it('ctrl.loginViaFacebook & ctrl.loginViaGoogle() on success response (without token) should do nothing', function () {
        authMock.statusVia = true;
        /* eslint-disable */
        successRes = {
            data: {}
        };
        /* eslint-enable */

        loginController.loginViaFacebook();
        loginController.loginViaGoogle();

        expect(authToken.setToken).to.not.have.been.called;
        expect(userSpy).to.not.have.been.called;
        expect(state.go).to.not.have.been.called;
    });

    it('ctrl.loginViaFacebook & ctrl.loginViaGoogle() on error response should call errorCallback(err)', function () {
        loginController.loginViaFacebook();
        loginController.loginViaGoogle();

        expect(errorCallbackSpy).to.have.been.calledWith(errorRes).and.calledTwice;
    });
});
