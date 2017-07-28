'use strict';


describe('Controllers: rootCtrl', function () {
    var rootCtrl,
        state;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, $state) {
        rootCtrl = $controller('rootCtrl');

        state = $state;

        sinon.spy(state, 'go');
    }));

    it('ctrl.redirectTo should be a function', function () {
        expect(rootCtrl.redirectTo).to.be.a('function');
    });

    it('ctrl.redirectTo() should call $state.go() once', function () {
        rootCtrl.redirectTo();

        expect(state.go).to.have.been.calledOnce;
    });
});
