'use strict';


describe('Controllers: myAccountController', function () {
    var myAccountController;

    beforeEach(module('app'));

    beforeEach(inject(function ($controller) {
        myAccountController = $controller('myAccountController');
    }));
});
