'use strict';


describe('Services: urlParamsProvider', function () {
    var APP_CONFIG,
        urlParams,
        windowMock;

    beforeEach(module(function ($provide) {
        windowMock = {
            location: {
                pathname: '/en/something',
                search: '?search'
            }
        };

        $provide.value('$window', windowMock);
    }));

    beforeEach(module('app'));

    beforeEach(inject(function (_APP_CONFIG_, _urlParams_) {
        APP_CONFIG = _APP_CONFIG_;

        urlParams = _urlParams_;
    }));

    it('urlParams.currentLanguage() should return a string', function () {
        expect(urlParams.currentLanguage()).to.be.a('string');
    });

    it('urlParams.currentLanguage() should return current language code', function () {
        expect(urlParams.currentLanguage()).to.equal('en');
    });

    it('urlParams.currentLanguage() should return default language code', function () {
        windowMock.location.pathname = 'something';

        expect(urlParams.currentLanguage()).to.equal(APP_CONFIG.languages[0]);
    });

    it('urlParams.rightPath() should return a string', function () {
        expect(urlParams.rightPath()).to.be.a('string');
    });

    it('urlParams.rightPath() should return complete path after language param', function () {
        expect(urlParams.rightPath()).to.equal('/something?search');
    });
});
