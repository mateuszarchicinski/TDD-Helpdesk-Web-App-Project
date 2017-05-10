'use strict';


describe('Controllers: registerController', function () {
    var registerController,
        eventMock,
        mdDialog;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $mdDialog) {
            registerController = $controller('registerController');

            eventMock = {
                preventDefault: function () {}
            };

            sinon.spy(eventMock, 'preventDefault');

            mdDialog = $mdDialog;

            sinon.spy(mdDialog, 'show');
        });
    });

    afterEach(function () {
        eventMock.preventDefault.restore();

        mdDialog.show.restore();
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

    it('ctrl.showDialog should be a function', function () {
        expect(registerController.showDialog).to.be.an('function');
    });

    it('ctrl.showDialog("terms&conditions") should call $mdDialog.show() once', function () {
        registerController.showDialog('terms&conditions');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_terms&conditionsDialog.html',
            clickOutsideToClose: true
        });
    });

    it('ctrl.showDialog("privacyPolicy") should call $mdDialog.show() once', function () {
        registerController.showDialog('privacyPolicy');

        expect(mdDialog.show).to.have.been.calledOnce;
        expect(mdDialog.show).to.have.been.calledWith({
            templateUrl: 'views/pl/components/_privacyPolicyDialog.html',
            clickOutsideToClose: true
        });
    });
});
