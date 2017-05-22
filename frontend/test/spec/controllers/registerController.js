'use strict';


describe('Controllers: registerController', function () {
    var eventMock,
        authMock,
        scope,
        registerController,
        mdDialog;

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, $controller, $mdDialog) {
            eventMock = {
                preventDefault: function () {}
            };
            authMock = {
                register: function () {}
            };

            sinon.spy(eventMock, 'preventDefault');
            sinon.spy(authMock, 'register');

            scope = $rootScope.$new();
            scope.firstName = 'Mateusz';
            scope.email = 'a@a';
            scope.password = 'aaaaaaaa';

            registerController = $controller('registerController', {
                auth: authMock,
                $scope: scope
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
