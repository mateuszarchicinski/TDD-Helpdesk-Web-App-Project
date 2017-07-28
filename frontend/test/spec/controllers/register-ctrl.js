/* global eventMock, authMock */


'use strict';


describe('Controllers: registerCtrl', function () {
    var scope,
        registerCtrl,
        mdDialog;

    beforeEach(function () {
        module('app');

        inject(function ($rootScope, $controller, $mdDialog) {
            scope = $rootScope.$new();
            scope.user = {
                firstName: 'Mateusz',
                email: 'a@a',
                password: 'aaaaaaaa',
                confirmPassword: 'aaaaaaaa'
            };

            registerCtrl = $controller('registerCtrl', {
                auth: authMock,
                $scope: scope
            });

            mdDialog = $mdDialog;

            sinon.spy(mdDialog, 'show');
        });
    });

    it('ctrl.registerForm should be an object', function () {
        expect(registerCtrl.registerForm).to.be.an('object');
    });

    it('ctrl.registerForm.submit should be a function', function () {
        expect(registerCtrl.registerForm.submit).to.be.an('function');
    });

    it('ctrl.registerForm.submit() should call event.preventDefault() once', function () {
        registerCtrl.registerForm.submit(eventMock);

        expect(eventMock.preventDefault).to.have.been.calledOnce;
    });

    it('ctrl.registerForm.submit() should call once auth.register(user) with correct user object as argument', function () {
        registerCtrl.registerForm.submit(eventMock);

        expect(authMock.register).to.have.been.calledOnce.and.calledWith({
            firstName: 'Mateusz',
            email: 'a@a',
            password: 'aaaaaaaa',
            confirmPassword: 'aaaaaaaa'
        });
    });

    it('ctrl.showDialog should be a function', function () {
        expect(registerCtrl.showDialog).to.be.an('function');
    });

    it('ctrl.showDialog("terms&conditions") should call $mdDialog.show() once with correct arguments', function () {
        registerCtrl.showDialog('terms&conditions');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_terms&conditions-dialog.html',
            clickOutsideToClose: true
        });
    });

    it('ctrl.showDialog("privacyPolicy") should call $mdDialog.show() once with correct arguments', function () {
        registerCtrl.showDialog('privacy-policy');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_privacy-policy-dialog.html',
            clickOutsideToClose: true
        });
    });
});
