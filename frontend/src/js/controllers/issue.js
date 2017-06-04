app.controller('issueCtrl', ['$scope', '$state', 'auth', 'user', function ($scope, $state, auth, user) {
    $scope.issue = $state.params;

    var getResources = this.getResources = function () {
        if (!$scope.issue.subject) {
            auth.issue('read', $scope.issue).then(function (res) {
                $scope.issue = res.data;
            }, function (err) {

            });
        }
    };

    getResources();


    var noteForm = this.noteForm = {};

    noteForm.submit = function (evt) {
        evt.preventDefault();

        var note = {
            _createdBy: user.getUser(),
            _issueId: $scope.issue._id,
            postDate: Date(),
            description: $scope.description,
            status: $scope.status
        };

        if (!$scope.issue.notes) {
            $scope.issue.notes = [];
        }

        $scope.issue.notes.push(note);

        auth.note('create', note).then(function (res) {

        }, function (err) {

        });

        if ($scope.issue.status !== note.status) {
            $scope.issue.status = note.status;
        }

        delete $scope.status;
        delete $scope.description;
    };


    this.formatDate = function (date) {
        return date ? date.substring(0, 24) : '';
    };
}]);
