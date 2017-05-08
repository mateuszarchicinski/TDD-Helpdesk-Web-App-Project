'use strict';


describe('Controllers: helpdeskController', function () {
    var helpdeskController,
        sinonSpyOnToggle,
        scope;

    beforeEach(module('app'));

    beforeEach(module(function ($provide) {
        sinonSpyOnToggle = sinon.spy();

        $provide.value('$mdSidenav', function () {
            return {
                toggle: sinonSpyOnToggle
            };
        });
    }));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        helpdeskController = $controller('helpdeskController', {
            $scope: scope
        });
    }));

    it('ctrl.toggleSidenav should be a function', function () {
        expect(helpdeskController.toggleSidenav).to.be.a('function');
    });

    it('ctrl.toggleSidenav() should call $mdSidenav("left").toggle() once', function () {
        helpdeskController.toggleSidenav();

        expect(sinonSpyOnToggle).to.have.been.calledOnce;
    });

    it('$scope.userServices should be an object with properties templateUrl and current.templateUrl', function () {
        expect(scope.userServices).to.be.an('object');
        expect(scope.userServices).to.have.property('templateUrl');
        expect(scope.userServices).to.have.deep.property('current.templateUrl');
    });
});
