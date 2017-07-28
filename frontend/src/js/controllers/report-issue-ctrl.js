/**
 * @class angular_module.Module:app.Controller:reportIssueCtrl
 * @memeberOf angular_module.app
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'reportIssueCtrl as RIC'
 * }
 * @example
 * <div ng-controller="reportIssueCtrl as RIC"></div>
 */


app.controller('reportIssueCtrl', ['$scope', 'sendRequest', function ($scope, sendRequest) {
    /**
     * @function issueForm&sdot;submit
     * @memberOf angular_module.Module:app.Controller:reportIssueCtrl
     * @instance
     * @description This method creates a new issue after sending issue form with validate data
     * @example
     * this.issueForm.submit($event);
     * issueForm.submit($event);
     * @example
     * <form name="issueForm" ng-submit="issueForm.$invalid || RIC.issueForm.submit($event)"></form>
     */


    var issueForm = this.issueForm = {};

    issueForm.submit = function (evt) {
        evt.preventDefault();

        $scope.issue.postDate = Date();

        /* eslint-disable */
        sendRequest('issue.create', angular.copy($scope.issue)).then(function (res) {
            delete $scope.issue;
        }, function (err) {});
        /* eslint-enable */
    };
}]);
