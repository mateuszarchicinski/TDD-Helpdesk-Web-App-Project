app.controller('userPanelController', ['$scope', 'user', '$state', function ($scope, user, $state) {
    function setUser(user) {
        if (user === null) {
            user = {};
        }

        if (!user.pictures || !user.pictures[0] || user.pictures[0] === 'https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/1379841_10150004552801901_469209496895221757_n.jpg?oh=d501be4493d45eab9adf54b6b8953587&oe=59A25233' || user.pictures[0] === 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50') {
            user.pictures = ['images/icons/person_white.png'];
        }

        return user;
    }

    $scope.user = setUser(user.getUser());

    var userGo = function (service) {
        $state.go('helpdesk.' + service);
    };

    this.userGo = userGo;
}]);
