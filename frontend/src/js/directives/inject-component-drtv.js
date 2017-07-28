/**
 * @function Directive: injectComponent
 * @memberOf angular_module.Module:app
 * @instance
 * @description This is an AngularJS directive component, to be used as HTML tag
 * @param {(Boolean|True)} condition Optional param to decide when component should be injected
 * @param {String} include Required param of injected component path, without extension .html
 * @example
 * <inject-component condition="true || false" include="'/components/example-component'"></inject-component>
 */


app.directive('injectComponent', ['urlParams', function injectComponent(urlParams) {
    return {
        restrict: 'E',
        scope: {
            condition: '=',
            include: '='
        },
        template: function () {
            return '<ng-include src="getTemplateUrl()"></ng-include>';
        },
        controller: ['$scope', function ($scope) {
            var getTemplateUrl = function (condition, include) {
                if ((condition !== undefined && (typeof condition !== 'boolean' || condition == false)) || typeof include !== 'string') {
                    return false;
                }

                return 'views/' + urlParams.currentLanguage() + '/' + include + '.html';
            };

            $scope.getTemplateUrl = function () {
                return getTemplateUrl($scope.condition, $scope.include);
            };
        }]
    };
}]);
