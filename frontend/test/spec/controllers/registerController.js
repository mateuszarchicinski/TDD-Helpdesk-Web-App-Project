'use strict';


describe('Controllers: registerController', function () {
    var registerController,
        eventMock;

    beforeEach(function () {
        module('app');

        inject(function ($controller) {
            registerController = $controller('registerController');

            eventMock = {
                preventDefault: function () {}
            };

            sinon.spy(eventMock, 'preventDefault');
        });
    });

    afterEach(function () {
        eventMock.preventDefault.restore();
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
});
