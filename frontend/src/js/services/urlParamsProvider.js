app.provider('urlParams', ['$windowProvider', function ($windowProvider) {
    var self = this,
        location = $windowProvider.$get().location,
        langValue = location.pathname.split('/')[1];

    var currentLanguage = function currentLanguage() {
        return self.languages.indexOf(langValue) === -1 ? self.languages[0] : langValue;
    };

    var rightPath = function () {
        return location.pathname.substring(currentLanguage().length + 1) + location.search;
    };

    this.languages = '';

    this.$get = function () {
        return {
            currentLanguage: currentLanguage,
            rightPath: rightPath
        };
    };
}]);
