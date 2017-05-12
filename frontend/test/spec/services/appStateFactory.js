'use strict';


describe('Services: appStateFactory', function () {
    var appState;

    beforeEach(function () {
        module('app');

        inject(function (_appState_) {
            appState = _appState_;
        });
    });

    it('appState.language should return a string', function () {
        expect(appState.language).to.be.a('string');
    });

    it('appState.isAuthorized() should return false', function () {
        expect(appState.isAuthorized()).to.be.false;
    });

    it('appState.setAuthorized(true) should change property authorized to true', function () {
        appState.setAuthorized(true);

        expect(appState.isAuthorized()).to.be.true;
    });

    it('appState.setAuthorized(false) should change property authorized to false', function () {
        appState.setAuthorized(true);

        expect(appState.isAuthorized()).to.be.true;
    });
});
