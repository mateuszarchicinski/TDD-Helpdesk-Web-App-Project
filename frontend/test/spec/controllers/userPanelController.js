'use strict';


describe('Controllers: userPanelController', function () {
    var userPanelController,
        scope;

    beforeEach(function () {
        module('app');

        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();

            userPanelController = $controller('userPanelController', {
                $scope: scope
            });
        });
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

    it('ctrl.userLogOut should be a function', function () {
        expect(userPanelController.userLogOut).to.be.a('function');
    });
});
