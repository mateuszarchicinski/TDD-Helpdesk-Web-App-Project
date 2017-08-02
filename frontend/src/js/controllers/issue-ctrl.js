/**
 * @class angular_module.Module:app.Controller:issueCtrl
 * @description This is an AngularJS controller component, can be defined in JavaScript object or as a value of attribute ng-controller
 * @example
 * {
 *  controller: 'issueCtrl as IC'
 * }
 * @example
 * <div ng-controller="issueCtrl as IC"></div>
 */


app.controller('issueCtrl', ['$scope', '$state', 'sendRequest', 'user', function ($scope, $state, sendRequest, user) {
    $scope.issue = $state.params;


    /**
     * @function getResources
     * @memberOf angular_module.Module:app.Controller:issueCtrl
     * @instance
     * @description This method takes care of current issue resources, gets them if not available
     * @example
     * this.getResources();
     * getResources();
     */


    var getResources = this.getResources = function () {
        if (!$scope.issue.subject) {
            sendRequest('issue.read', $scope.issue).then(function (res) {
                $scope.issue = res.data;

                /* eslint-disable */
            }, function (err) {
                /* eslint-enable */
            });
        }
    };

    getResources();


    this.formatDate = function (date) {
        return date ? date.substring(0, 24) : '';
    };


    /**
     * @function noteForm&sdot;submit
     * @memberOf angular_module.Module:app.Controller:issueCtrl
     * @instance
     * @description This method creates a new note after sending note form with validate data
     * @example
     * this.noteForm.submit($event);
     * noteForm.submit($event);
     * @example
     * <form name="noteForm" ng-submit="noteForm.$invalid || IC.noteForm.submit($event)"></form>
     */


    var noteForm = this.noteForm = {};

    noteForm.submit = function (evt) {
        var issue = $scope.issue,
            note = $scope.note,
            nUser = user.getUser();

        evt.preventDefault();

        note._createdBy = nUser._id;
        note._issueId = issue._id;
        note.postDate = Date();

        /* eslint-disable */
        sendRequest('note.create', angular.copy(note)).then(function (res) {
            if (issue.status !== note.status) {
                issue.status = note.status;
            }

            note._createdBy = nUser;

            issue.notes.push(note);

            delete $scope.note;
        }, function (err) {});
        /* eslint-enable */
    };
}]);
