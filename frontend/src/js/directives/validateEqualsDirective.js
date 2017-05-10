app.directive('validateEquals', [function () {
    return {
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
