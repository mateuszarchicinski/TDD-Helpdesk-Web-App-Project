'use strict';


describe('Services: appStateFactory', function () {
    var appState;

    beforeEach(function () {
        module('app');

        inject(function (_appState_) {
            appState = _appState_;
        });
    });

    it('appState should return an object with methods language and isAuthorized', function () {
        expect(appState).to.be.an('object');
        expect(appState).to.have.property('language').that.is.a('function');
        expect(appState).to.have.property('isAuthorized').that.is.a('function');
    });

    it('appState.language() should return a string', function () {
        expect(appState.language()).to.be.a('string');
    });

    it('appState.isAuthorized() should return a boolean', function () {
        expect(appState.isAuthorized()).to.be.a('boolean');
    });
});
