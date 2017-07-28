/* eslint-disable */


'use strict';


describe('Controllers: myAccountCtrl', function () {
    var scope,
        myAccountCtrl;

    beforeEach(module('app'));

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        myAccountCtrl = $controller('myAccountCtrl', {
            $scope: scope
        });
    }));
});
