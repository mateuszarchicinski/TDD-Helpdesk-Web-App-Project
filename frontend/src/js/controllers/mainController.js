app.controller('mainController', ['appState', function (appState) {
    this.isAuthorized = function () {
        return appState.isAuthorized();
    };

    this.authorizedClass = function () {
        return appState.isAuthorized() ? 'authorized' : 'unauthorized';
    };

    appState.setAuthorized(true);
}]);
