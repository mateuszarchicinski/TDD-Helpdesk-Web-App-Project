app.controller('rootController', ['appState', '$state', function (appState, $state) {
    var redirectTo = this.redirectTo = function () {
        var defaultState = 'login';

        if (appState.isAuthorized()) {
            defaultState = 'helpdesk.dashboard';
        }

        $state.go(defaultState);
    };

    redirectTo();
}]);
