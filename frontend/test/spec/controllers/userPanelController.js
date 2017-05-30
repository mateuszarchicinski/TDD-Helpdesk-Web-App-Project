'use strict';


describe('Controllers: userPanelController', function () {
    var userPanelController,
        scope,
        state;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $rootScope, $state) {
            scope = $rootScope.$new();

            userPanelController = $controller('userPanelController', {
                $scope: scope
            });

            state = $state;
            sinon.spy(state, 'go');
        });
    });

    afterEach(function () {
        state.go.restore();
    });

    it('$scope.user should be an object with property pictures', function () {
        expect(scope.user).to.be.an('object');
        expect(scope.user).to.have.property('pictures').that.is.deep.equal(['images/icons/person_white.png']);
    });

    it('ctrl.userGo should be a function', function () {
        expect(userPanelController.userGo).to.be.a('function');
    });

    it('ctrl.userGo("myAccount") should call $state.go("helpdesk.myAccount") once', function () {
        userPanelController.userGo('myAccount');

        expect(state.go).to.have.been.calledWith('helpdesk.myAccount');
    });

    it('ctrl.userGo("logout") should call $state.go("helpdesk.logout") once', function () {
        userPanelController.userGo('logout');

        expect(state.go).to.have.been.calledWith('helpdesk.logout');
    });
});
