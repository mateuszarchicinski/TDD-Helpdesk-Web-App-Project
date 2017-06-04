app.controller('report_issue', ['$scope', 'auth', function ($scope, auth) {
    var issueForm = this.issueForm = {};

    issueForm.submit = function (evt) {
        evt.preventDefault();

        var issue = angular.copy($scope.issue);
        issue.postDate = Date();

        
        auth.issue('create', issue).then(function (res) {
            
        }, function (err) {
            
        });

        delete $scope.issue;
    };
}]);
