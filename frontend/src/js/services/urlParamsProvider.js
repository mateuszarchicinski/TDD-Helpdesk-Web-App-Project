app.provider('urlParams', ['$windowProvider', function ($windowProvider) {
    var self = this;

    function getParams() {
        var window = $windowProvider.$get();

        return {
            location: window.location,
            langValue: window.location.pathname.split('/')[1]
        };
    }

    function currentLanguage() {
        var lang = getParams().langValue;

        return self.languages.indexOf(lang) === -1 ? self.languages[0] : lang;
    }

    function rightPath() {
        var location = getParams().location;

        return location.pathname.substring(currentLanguage().length + 1) + location.search;
    }

    this.languages = ['pl'];

    this.currentLanguage = currentLanguage;

    this.$get = function () {
        return {
            currentLanguage: currentLanguage,
            rightPath: rightPath
        };
    };
}]);
