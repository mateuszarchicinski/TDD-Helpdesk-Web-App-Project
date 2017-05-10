app.controller('translateController', ['urlParams', '$window', function (urlParams, $window) {
    this.language = this.language || urlParams.currentLanguage();

    this.translate = function (langCode) {
        if (this.language !== langCode) {
            $window.location.href = '/' + langCode + urlParams.rightPath();

        }
    };
}]);
