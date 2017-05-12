app.factory('authToken', ['$window', 'APP_CONFIG', function ($window, APP_CONFIG) {
    var localStorage = $window.localStorage,
        cachedToken,
        tokenConfig = APP_CONFIG.tokenConfig,
        prefixToken = tokenConfig.prefix || 'HDA',
        nameToken = tokenConfig.name || 'userToken',
        headerToken = tokenConfig.header || 'Authorization',
        typeToken = tokenConfig.type || 'Bearer',
        fullNameToken = prefixToken + '-' + nameToken;

    var setToken = function (token) {
        cachedToken = token;

        localStorage.setItem(fullNameToken, token);
    };

    var getToken = function () {
        if (!cachedToken) {
            cachedToken = localStorage.getItem(fullNameToken);
        }

        return cachedToken;
    };

    var removeToken = function () {
        cachedToken = null;

        localStorage.removeItem(fullNameToken);
    };

    var isAuthenticated = function () {
        return !!getToken();
    };

    return {
        config: {
            prefix: prefixToken,
            name: nameToken,
            fullName: fullNameToken,
            header: headerToken,
            type: typeToken
        },
        setToken: setToken,
        getToken: getToken,
        removeToken: removeToken,
        isAuthenticated: isAuthenticated
    };
}]);
