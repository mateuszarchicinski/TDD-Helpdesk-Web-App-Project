(function () {

    'use strict';


    app.controller('mainController', ['$log', '$scope', function ($log) {

        $log.info('mainController: ', 'JS running....');

        var appState = this.appState = {
            authorized: false,
            authorizedClass: 'authorized',
            unauthorizedClass: 'unauthorized'
        };

        appState.getClass = function () {
            return appState.authorized ? appState.authorizedClass : appState.unauthorizedClass;
        };

    }]);

})();
