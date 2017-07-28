'use strict';


describe('Controllers: userPanelCtrl', function () {
    var userPanelCtrl,
        scope,
        state;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $rootScope, $state) {
            scope = $rootScope.$new();

            userPanelCtrl = $controller('userPanelCtrl', {
                $scope: scope
            });

            state = $state;
            sinon.spy(state, 'go');
        });
    });

    afterEach(function () {
        state.go.restore();
    });

    it('ctrl.userGo should be a function', function () {
        expect(userPanelCtrl.userGo).to.be.a('function');
    });

    it('ctrl.userGo("myAccount") should call $state.go("helpdesk.myAccount") once', function () {
        userPanelCtrl.userGo('myAccount');

        expect(state.go).to.have.been.calledWith('helpdesk.myAccount');
    });

    it('ctrl.userGo("logout") should call $state.go("helpdesk.logout") once', function () {
        userPanelCtrl.userGo('logout');

        expect(state.go).to.have.been.calledWith('helpdesk.logout');
    });
});
