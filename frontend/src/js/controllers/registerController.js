(function () {

    'use strict';


    app.controller('registerController', ['$log', function ($log) {

        $log.info('registerController: ', 'JS running....');

        var registerForm = this.registerForm = {};

        registerForm.submit = function (evt) {
            evt.preventDefault();

            $log.info('registerForm successfully submitted!');
        };

    }]);

})();
