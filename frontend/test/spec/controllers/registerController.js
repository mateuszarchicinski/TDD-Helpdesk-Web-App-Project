/* global eventMock, authMock, successRes, errorCallbackSpy, errorRes */


'use strict';


describe('Controllers: registerController', function () {
    var scope,
        authToken,
        userSpy,
        state,
        registerController,
        mdDialog;

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, _authToken_, $state, $controller, $mdDialog) {
            authToken = _authToken_;
            state = $state;

            sinon.spy(authToken, 'setToken');
            userSpy = sinon.spy();
            sinon.spy(state, 'go');


            scope = $rootScope.$new();
            scope.firstName = 'Mateusz';
            scope.email = 'a@a';
            scope.password = 'aaaaaaaa';

            registerController = $controller('registerController', {
                auth: authMock,
                $scope: scope,
                user: userSpy
            });

            mdDialog = $mdDialog;

            sinon.spy(mdDialog, 'show');
        });
    });

    it('ctrl.registerForm should be an object', function () {
        expect(registerController.registerForm).to.be.an('object');
    });

    it('ctrl.registerForm.submit should be a function', function () {
        expect(registerController.registerForm.submit).to.be.an('function');
    });

    it('ctrl.registerForm.submit() should call event.preventDefault() once', function () {
        registerController.registerForm.submit(eventMock);

        expect(eventMock.preventDefault).to.have.been.calledOnce;
    });

    it('ctrl.registerForm.submit() should call auth.register(user) with correct user object as argument', function () {
        registerController.registerForm.submit(eventMock);

        expect(authMock.register).to.have.been.calledWith({
            firstName: 'Mateusz',
            email: 'a@a',
            password: 'aaaaaaaa'
        });
    });

    it('ctrl.registerForm.submit() on success response should save user token/user data & redirect to helpdesk state', function () {
        authMock.statusReg = true;

        registerController.registerForm.submit(eventMock);

        expect(authToken.setToken).to.have.been.calledWith(successRes.data.token);
        expect(userSpy).to.have.been.calledWith(successRes.data);
        expect(state.go).to.have.been.calledWith('helpdesk.dashboard');
    });

    it('ctrl.registerForm.submit() on success response (without token) should do nothing', function () {
        authMock.statusReg = true;
        /* eslint-disable */
        successRes = {
            data: {}
        };
        /* eslint-enable */

        registerController.registerForm.submit(eventMock);

        expect(authToken.setToken).to.not.have.been.called;
        expect(userSpy).to.not.have.been.called;
        expect(state.go).to.not.have.been.called;
    });

    it('ctrl.registerForm.submit() on error response should call errorCallback(err)', function () {
        registerController.registerForm.submit(eventMock);

        expect(errorCallbackSpy).to.have.been.calledWith(errorRes);
    });

    it('ctrl.showDialog should be a function', function () {
        expect(registerController.showDialog).to.be.an('function');
    });

    it('ctrl.showDialog("terms&conditions") should call $mdDialog.show() once with correct arguments', function () {
        registerController.showDialog('terms&conditions');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_terms&conditionsDialog.html',
            clickOutsideToClose: true
        });
    });

    it('ctrl.showDialog("privacyPolicy") should call $mdDialog.show() once with correct arguments', function () {
        registerController.showDialog('privacyPolicy');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_privacyPolicyDialog.html',
            clickOutsideToClose: true
        });
    });
});
