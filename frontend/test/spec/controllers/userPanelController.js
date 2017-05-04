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

    it('Unit test - Initialization userPanelController', function () {
        userPanelController;
    });
});
