'use strict';


describe('Controllers: myAccountController', function () {
    var scope,
        myAccountController;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        myAccountController = $controller('myAccountController', {
            $scope: scope
        });
    }));
});
