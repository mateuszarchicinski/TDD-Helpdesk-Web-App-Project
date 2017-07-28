/**
 * @function Directive: validateEquals
 * @memberOf angular_module.Module:app
 * @instance
 * @description This is an AngularJS directive component, to be used as input HTML tag attribute
 * @param {dataModel} validate-equals Required param to pass dataModel of other input to validate equals with used input dataModel
 * @example
 * <form name="exampleName">
 *  <input name="password" ng-model="password"/>
 *  <input name="confirmPassword" ng-model="confirmPassword" validate-equals="password"/>
 * </form>
 */


app.directive('validateEquals', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            validateEquals: '='
        },
        link: function (scope, elem, attr, ngModel) {
            ngModel.$validators.validateEquals = function (modelValue) {
                return modelValue === scope.validateEquals;
            };

            scope.$watch('validateEquals', function () {
                ngModel.$validate();
            });
        }
    };
}]);
