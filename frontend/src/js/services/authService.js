app.service('auth', ['APP_CONFIG', '$http', 'md5', 'authToken', '$state', function (APP_CONFIG, $http, md5, authToken, $state) {
    var apiConfig = APP_CONFIG.apiConfig,
        baseUrl = apiConfig.baseUrl || '/',
        registerUrl = apiConfig.registerUrl || 'auth/register',
        loginUrl = apiConfig.loginUrl || 'auth/login',
        facebookUrl = apiConfig.loginVia.facebookUrl || 'auth/facebook',
        googleUrl = apiConfig.loginVia.googleUrl || 'auth/google';

    function sendRequest(user, url) {
        user = user || {};
        user.password = md5.createHash(user.password);

        $http.post(baseUrl + url, user).then(function (res) {
            var user = res.data;

            authToken.setToken(user.token);

            $state.go('helpdesk');
        }, function (err) {
            console.log(err);
        });
    }

    this.register = function (user) {
        sendRequest(user, registerUrl);
    };

    this.login = function (user) {
        sendRequest(user, loginUrl);
    };

    this.loginVia = function (provider) {
        console.log(provider);
    };

}]);
