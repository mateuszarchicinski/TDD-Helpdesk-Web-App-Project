app.factory('appState', ['urlParams', 'authToken', function (urlParams, authToken) {
    var appState = {
        language: urlParams.currentLanguage,
        isAuthorized: authToken.isAuthenticated
    };

    return appState;
}]);
