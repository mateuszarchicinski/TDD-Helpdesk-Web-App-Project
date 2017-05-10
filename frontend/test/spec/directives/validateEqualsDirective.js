'use strict';


describe('Directives: validateEqualsDirective', function () {
    var compile,
        scope,
        validateEquals;

    beforeEach(function () {
        module('app');

        inject(function ($compile, $rootScope) {
            compile = $compile;

            scope = $rootScope.$new();
            scope.password = 'THE_SAME_PASSWORD';

            validateEquals = compile('<form name="registerForm"><input name="password" ng-model="password"><input name="confirmPassword" ng-model="confirmPassword" validate-equals="password"></form>')(scope);
        });
    });

    it('registerForm.confirmPassword.$validators should have property validateEquals which is a function', function () {
        expect(scope.registerForm.confirmPassword.$validators).to.have.property('validateEquals').that.is.a('function');
    });

    it('should not attach {validateEquals: true} to registerForm.confirmPassword.$error', function () {
        scope.confirmPassword = 'THE_SAME_PASSWORD';

        scope.$digest();

        expect(scope.registerForm.confirmPassword.$error).to.deep.equal({});
    });

    it('should attach {validateEquals: true} to registerForm.confirmPassword.$error', function () {
        scope.confirmPassword = 'NOT_THE_SAME_PASSWORD';

        scope.$digest();

        expect(scope.registerForm.confirmPassword.$error).to.deep.equal({
            validateEquals: true
        });
    });
});
