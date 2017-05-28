'use strict';


describe('Controllers: rootController', function () {
    var rootController,
        state;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $state) {
        rootController = $controller('rootController');

        state = $state;

        sinon.spy(state, 'go');
    }));

    it('ctrl.redirectTo should be a function', function () {
        expect(rootController.redirectTo).to.be.a('function');
    });

    it('ctrl.redirectTo() should call $state.go() once', function () {
        rootController.redirectTo();

        expect(state.go).to.have.been.calledOnce;
    });
});
