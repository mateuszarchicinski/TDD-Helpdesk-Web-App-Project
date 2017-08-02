/**
 * @class angular_module.Module:app.Controller:myIssuesCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'myIssuesCtrl as MIC'
 * }
 * @example
 * <div ng-controller="myIssuesCtrl as MIC"></div>
 */


app.controller('myIssuesCtrl', ['sendRequest', 'user', '$scope', function (sendRequest, user, $scope) {
    var issues;

    sendRequest('issues').then(function (res) {
        user.set('my-issues', res.data);

        issues = $scope.issues = user.get('my-issues') || res.data || [];

        /* eslint-disable */
    }, function (err) {
        /* eslint-enable */
    });


    this.formatDate = function (date) {
        return date ? date.substring(0, 24) : '';
    };


    /**
     * @function removeIssue
     * @memberOf angular_module.Module:app.Controller:myIssuesCtrl
     * @instance
     * @description This method is used to remove issue
     * @param {Object} issue Required param to indicate which issue object needs to be removed
     * @example
     * this.removeIssue(issue);
     * @example
     * <button ng-click="MIC.removeIssue(issue)">Remove Issue</button>
     */


    this.removeIssue = function (issue) {
        /* eslint-disable */
        sendRequest('issue.delete', issue).then(function (res) {}, function (err) {
            if (err.status === 410) {
                issues.splice(issues.indexOf(issue), 1);
            }
        });
        /* eslint-enable */
    };
}]);
