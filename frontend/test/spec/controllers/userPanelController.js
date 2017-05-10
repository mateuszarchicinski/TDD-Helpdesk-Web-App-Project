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

    it('ctrl.userGo should be a function', function () {
        expect(userPanelController.userGo).to.be.a('function');
    });

    it('ctrl.userGo() should call $state.go("helpdesk", {service: "myaccount"}) once', function () {
        userPanelController.userGo('myaccount');

        expect(state.go).to.have.been.calledWith('helpdesk', {
            service: 'myaccount'
        });
    });

    it('ctrl.userGo() should call $state.go("helpdesk", {service: "logout"}) once', function () {
        userPanelController.userGo('logout');

        expect(state.go).to.have.been.calledWith('helpdesk', {
            service: 'logout'
        });
    });
});
