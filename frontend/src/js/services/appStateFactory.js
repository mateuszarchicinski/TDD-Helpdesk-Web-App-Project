app.factory('appState', ['urlParams', function (urlParams) {
    var appState = {
        language: urlParams.currentLanguage(),
        authorized: false
    };

    var getter = function (property) {
        return appState[property];
    };

    var setAuthorized = function (boolean) {
        if (typeof boolean === 'boolean' && appState.authorized !== boolean) {
            appState.authorized = boolean;
        }
    };

    var isAuthorized = function () {
        return appState.authorized;
    };

    return {
        language: getter('language'),
        setAuthorized: setAuthorized,
        isAuthorized: isAuthorized
    };
}]);
