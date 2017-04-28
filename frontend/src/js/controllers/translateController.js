(function () {

    'use strict';


    app.controller('translateController', ['urlParams', '$window', '$log', function (urlParams, $window, $log) {
        $log.info('translateController: ', 'JS running....');

        this.language = this.language || urlParams.currentLanguage();

        this.translate = function (langCode) {
            if (this.language !== langCode) {
                $window.location.href = langCode + urlParams.rightPath();
            }
        };
    }]);

})();
