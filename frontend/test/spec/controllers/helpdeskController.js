'use strict';


describe('Controllers: helpdeskController', function () {
    var helpdeskController;

    beforeEach(function () {
        module('app');

        inject(function ($controller) {
            helpdeskController = $controller('helpdeskController');
        });
    });

    it('Unit test - Initialization helpdeskController', function () {
        helpdeskController;
    });
});
