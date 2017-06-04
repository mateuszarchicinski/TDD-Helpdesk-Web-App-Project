app.controller('my_issues', ['auth', 'user', '$scope', function (auth, user, $scope) {
    var issues;

    auth.issues().then(function (res) {
        user.set('issues', res.data);

        issues = $scope.issues = user.get('issues');

        /* eslint-disable */
    }, function (err) {
        /* eslint-enable */
    });

    this.formatDate = function (date) {
        return date ? date.substring(0, 24) : '';
    };

    this.removeIssue = function (issue) {
        issues.splice(issues.indexOf(issue), 1);

        auth.issue('delete', issue).then(function (res) {

        }, function (err) {

        });
    };
}]);
