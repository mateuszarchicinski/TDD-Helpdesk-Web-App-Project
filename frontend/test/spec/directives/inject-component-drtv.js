'use strict';


describe('Directives: injectComponentDirective', function () {
    var compile,
        scope,
        injectComponent;

    beforeEach(function () {
        module('app');

        inject(function ($templateCache, $compile, $rootScope) {
            $templateCache.put('views/pl/something.html', '<div>Something</div>');
            compile = $compile;

            scope = $rootScope.$new();
            scope.templateUrl = 'something';

            injectComponent = compile('<inject-component condition="condition" include="templateUrl"></inject-component>')(scope);
        });
    });

    it('<inject-component condtion="true" include="something"></inject-component> should inject component', function () {
        scope.condition = true;
        scope.$digest();

        expect(injectComponent.html()).to.contain('Something');
    });

    it('<inject-component condtion="false" include="something"></inject-component> should not inject component', function () {
        scope.condition = false;
        scope.$digest();

        expect(injectComponent.html()).to.not.contain('Something');
    });

    it('<inject-component include="something"></inject-component> should inject component', function () {
        var injectComponent = compile('<inject-component include="templateUrl"></inject-component>')(scope);

        scope.$digest();

        expect(injectComponent.html()).to.contain('Something');
    });
});
