/* global authMock, errorCallbackSpy, errorRes */


'use strict';


describe('Controllers: logoutController', function () {
    var logoutController,
        authToken,
        user,
        state;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller, _authToken_, _user_, $state) {
        authToken = _authToken_;
        user = _user_;
        state = $state;

        sinon.spy(authToken, 'removeToken');
        sinon.spy(user, 'removeUser');
        sinon.spy(state, 'go');

        logoutController = $controller('logoutController', {
            auth: authMock
        });
    }));

    it('ctrl.logout should be a function', function () {
        expect(logoutController.logout).to.be.an('function');
    });

    it('ctrl.logout() should call auth.logout() twice', function () {
        logoutController.logout();

        expect(authMock.logout).to.have.been.calledTwice;
    });

    it('ctrl.logout() on success response should remove user token/user data & redirect to root state', function () {
        authMock.statusOut = true;

        logoutController.logout();

        expect(authToken.removeToken).to.have.been.calledOnce;
        expect(user.removeUser).to.have.been.calledOnce;
        expect(state.go).to.have.been.calledWith('root');
    });

    it('ctrl.logout() on error response should call errorCallback(err)', function () {
        logoutController.logout();

        expect(errorCallbackSpy).to.have.been.calledWith(errorRes);
    });
});
