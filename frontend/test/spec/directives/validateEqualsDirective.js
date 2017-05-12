'use strict';


describe('Directives: validateEqualsDirective', function () {
    var compile,
        scope;

    beforeEach(function () {
        module('app');

        inject(function ($compile, $rootScope) {
            compile = $compile;

            scope = $rootScope.$new();
            scope.password = 'THE_SAME_PASSWORD';

            compile('<form name="registerForm"><input name="password" ng-model="password"><input name="confirmPassword" ng-model="confirmPassword" validate-equals="password"></form>')(scope);
        });
    });

    it('should add new property validateEquals <function> to $validators object', function () {
        expect(scope.registerForm.confirmPassword.$validators).to.have.property('validateEquals').that.is.a('function');
    });

    it('should not add new error property {validateEquals: true} to errors object', function () {
        scope.confirmPassword = 'THE_SAME_PASSWORD';

        scope.$digest();

        expect(scope.registerForm.confirmPassword.$error).to.deep.equal({});
    });

    it('should add new error property {validateEquals: true} to errors object', function () {
        scope.confirmPassword = 'NOT_THE_SAME_PASSWORD';

        scope.$digest();

        expect(scope.registerForm.confirmPassword.$error).to.deep.equal({
            validateEquals: true
        });
    });
});
