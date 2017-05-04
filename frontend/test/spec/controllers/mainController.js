'use strict';


describe('Controllers: mainController', function () {
    var mainController,
        appState;

    beforeEach(function () {
        module('app');

        inject(function ($controller, _appState_) {
            appState = _appState_;

            mainController = $controller('mainController');
        });
    });

    it('ctrl.isAuthorized() should be a boolean', function () {
        expect(mainController.isAuthorized()).to.be.a('boolean');
    });

    it('ctrl.authorizedClass() should be a string', function () {
        expect(mainController.authorizedClass()).to.be.a('string');
    });

    it('ctrl.authorizedClass() should return class: authorized', function () {
        appState.setAuthorized(true);

        expect(mainController.authorizedClass()).to.equal('authorized');
    });

    it('ctrl.authorizedClass() should return class: unauthorized', function () {
        appState.setAuthorized(false);

        expect(mainController.authorizedClass()).to.equal('unauthorized');
    });
});
