/* global authMock */


'use strict';


describe('Controllers: logoutCtrl', function () {
    var logoutCtrl;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller) {
        logoutCtrl = $controller('logoutCtrl', {
            auth: authMock
        });
    }));

    it('ctrl.logout should be a function', function () {
        expect(logoutCtrl.logout).to.be.an('function');
    });

    it('ctrl.logout() should call auth.logout() twice', function () {
        logoutCtrl.logout();

        expect(authMock.logout).to.have.been.calledTwice;
    });
});
