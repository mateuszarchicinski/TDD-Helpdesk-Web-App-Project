'use strict';


describe('Controllers: languageSettingsCtrl', function () {
    var languageSettingsCtrl,
        urlParams,
        window,
        APP_CONFIG;

    beforeEach(function () {
        module('app');

        inject(function ($controller, _urlParams_, _APP_CONFIG_) {
            urlParams = _urlParams_;

            window = {
                location: {
                    href: 'http://localhost:4848/pl'
                }
            };

            APP_CONFIG = _APP_CONFIG_;

            languageSettingsCtrl = $controller('languageSettingsCtrl', {
                urlParams: urlParams,
                $window: window
            });
        });

        sinon.spy(urlParams, 'rightPath');
    });

    afterEach(function () {
        window.location.href = null;

        urlParams.rightPath.restore();
    });

    it('ctrl.language should be a string', function () {
        expect(languageSettingsCtrl.language).to.be.a('string');
    });

    it('ctrl.language should return correct language code', function () {
        expect(languageSettingsCtrl.language).to.be.oneOf(APP_CONFIG.languages);
    });

    it('ctrl.translate(langCode) should be a function', function () {
        expect(languageSettingsCtrl.translate).to.be.a('function');
    });

    it('ctrl.translate(langCode) called with another language of current state should call window.location.href', function () {
        languageSettingsCtrl.translate('en');

        expect(urlParams.rightPath).to.have.been.calledOnce;

        expect(window.location.href).to.match(/^\/en.*/);
    });

    it('ctrl.translate(langCode) called with the same language of current state should not call window.location.href', function () {
        languageSettingsCtrl.translate('pl');

        expect(urlParams.rightPath).to.not.have.been.calledOnce;

        expect(window.location.href).to.match(/\/pl$/);
    });
});
