app.directive('injectComponent', ['urlParams', function (urlParams) {
    return {
        restrict: 'E',
        scope: {
            condition: '=',
            include: '='
        },
        template: function () {
            return '<ng-include src="getTemplateUrl()"></ng-include>';
        },
        controller: function ($scope) {
            var getTemplateUrl = function (condition, include) {
                if ((condition !== undefined && (typeof condition !== 'boolean' || condition == false)) || typeof include !== 'string') {
                    return false;
                }

                return 'views/' + urlParams.currentLanguage() + '/' + include + '.html';
            };

            $scope.getTemplateUrl = function () {
                return getTemplateUrl($scope.condition, $scope.include);
            };
        }
    };
}]);
