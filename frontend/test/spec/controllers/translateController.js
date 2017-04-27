'use strict';


describe('Controllers: translateController', function () {
    var translateController,
        window,
        APP_CONFIG;

    beforeEach(function () {
        module('app')

        inject(function ($controller, _urlParams_, _APP_CONFIG_) {
            window = {
                location: {
                    href: null
                }
            };

            translateController = $controller('translateController', {
                urlParams: _urlParams_,
                $window: window
            });

            APP_CONFIG = _APP_CONFIG_;
        });
    });

    afterEach(function () {
        window.location.href = null;
    });

    it('ctrl.language should be a string', function () {
        expect(translateController.language).to.be.a('string');
    });

    it('ctrl.language should return correct language code', function () {
        expect(translateController.language).to.be.oneOf(APP_CONFIG.languages);
    });

    it('ctrl.translate(langCode) should be a function', function () {
        expect(translateController.translate).to.be.a('function');
    });

    it('ctrl.translate(langCode) called with another language of current state should call window.location.href', function () {
        translateController.translate('en');

        expect(window.location.href).to.match(/\/en\//);
    });
});
