/**
 * @class angular_module.Module:app.Controller:reportedIssuesCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'reportedIssuesCtrl as RIC'
 * }
 * @example
 * <div ng-controller="reportedIssuesCtrl as RIC"></div>
 */


app.controller('reportedIssuesCtrl', ['sendRequest', 'user', '$scope', function (sendRequest, user, $scope) {
    var issues;

    sendRequest('issues', user.getUser() || {
        role: 'assistant'
    }).then(function (res) {
        user.set('reported-issues', res.data);

        issues = $scope.issues = user.get('reported-issues') || res.data;

        /* eslint-disable */
    }, function (err) {
        /* eslint-enable */
    });


    this.formatDate = function (date) {
        return date ? date.substring(0, 24) : '';
    };


    /**
     * @function removeIssue
     * @memberOf angular_module.Module:app.Controller:reportedIssuesCtrl
     * @instance
     * @description This method is used to remove issue
     * @param {Object} issue Required param to indicate which issue object needs to be removed
     * @example
     * this.removeIssue(issue);
     * @example
     * <button ng-click="RIC.removeIssue(issue)">Remove Issue</button>
     */


    this.removeIssue = function (issue) {
        /* eslint-disable */
        sendRequest('issue.delete', issue).then(function (res) {
            issues.splice(issues.indexOf(issue), 1);
        }, function (err) {});
        /* eslint-enable */
    };
}]);
