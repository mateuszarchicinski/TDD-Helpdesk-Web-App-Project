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

    it('$scope.user should be an object with properties firstName, lastName and imageSource', function () {
        expect(scope.user).to.be.an('object');
        expect(scope.user).to.have.property('firstName');
        expect(scope.user).to.have.property('lastName');
        expect(scope.user).to.have.property('imageSource');
    });

    it('ctrl.userAccount should be a function', function () {
        expect(userPanelController.userAccount).to.be.a('function');
    });

    it('ctrl.userAccount() should call $state.go("helpdesk", {fun: "myaccount"}) once', function () {
        userPanelController.userAccount();

        expect(state.go).to.always.have.been.calledWith('helpdesk', {
            fun: 'myaccount'
        });
    });

    it('ctrl.userLogOut should be a function', function () {
        expect(userPanelController.userLogOut).to.be.a('function');
    });


    it('ctrl.userLogOut() should call $state.go("helpdesk", {fun: "logout"}) once', function () {
        userPanelController.userLogOut();

        expect(state.go).to.always.have.been.calledWith('helpdesk', {
            fun: 'logout'
        });
    });
});
