'use strict';


describe('Controllers: helpdeskController', function () {
    var helpdeskController,
        sinonSpyOnToggle;

    beforeEach(module('app'));

    beforeEach(module(function ($provide) {
        sinonSpyOnToggle = sinon.spy();

        $provide.value('$mdSidenav', function () {
            return {
                toggle: sinonSpyOnToggle
            };
        });
    }));

    beforeEach(inject(function ($controller) {
        helpdeskController = $controller('helpdeskController');
    }));

    it('ctrl.toggleSidenav should be a function', function () {
        expect(helpdeskController.toggleSidenav).to.be.a('function');
    });

    it('ctrl.toggleSidenav() should call $mdSidenav("left").toggle() once', function () {
        helpdeskController.toggleSidenav();

        expect(sinonSpyOnToggle).to.have.been.calledOnce;
    });

    it('ctrl.funUrlTemplate should be a function', function () {
        expect(helpdeskController.funUrlTemplate).to.be.a('function');
    });

    it('ctrl.funUrlTemplate() should return boolean or string', function () {
        var value = helpdeskController.funUrlTemplate();

        expect(typeof value === 'boolean' || typeof value === 'string' ? true : false).to.be.true;
    });
});
