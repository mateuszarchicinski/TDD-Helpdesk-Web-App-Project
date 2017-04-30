(function () {

    'use strict';


    app.controller('loginController', ['$log', function ($log) {

        $log.info('loginController: ', 'JS running....');

        var loginForm = this.loginForm = {};

        loginForm.submit = function () {
            $log.info('loginForm successfully submitted!');
        };

    }]);

})();
