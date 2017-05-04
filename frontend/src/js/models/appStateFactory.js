app.factory('appState', ['urlParams', function (urlParams) {
    var appState = {
        language: urlParams.currentLanguage(),
        authorized: null
    };

    var getter = function (property) {
        return appState[property];
    };

    var setAuthorized = function (boolean) {
        if (typeof boolean !== 'boolean') {
            boolean = false;
        }

        appState.authorized = boolean;
    };

    var isAuthorized = function () {
        return appState.authorized ? true : false;
    };

    return {
        language: getter('language'),
        setAuthorized: setAuthorized,
        isAuthorized: isAuthorized
    };
}]);
