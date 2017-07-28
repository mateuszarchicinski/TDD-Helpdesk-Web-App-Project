'use strict';


describe('Services: urlParamsProvider', function () {
    var windowMock,
        urlParamsProvider,
        urlParams,
        languagesMock = ['es', 'it'];

    beforeEach(module(function ($provide) {
        windowMock = {
            location: {
                pathname: '/it/something',
                search: '?search'
            }
        };

        $provide.value('$window', windowMock);
    }));

    beforeEach(module('app'));

    beforeEach(module(function (_urlParamsProvider_) {
        urlParamsProvider = _urlParamsProvider_;
        urlParamsProvider.languages = languagesMock;
    }));

    beforeEach(module('app'));

    beforeEach(inject(function (_urlParams_) {
        urlParams = _urlParams_;
    }));

    it('urlParams.currentLanguage() should return a string', function () {
        expect(urlParamsProvider.currentLanguage()).to.be.a('string');
        expect(urlParams.currentLanguage()).to.be.a('string');
    });

    it('urlParams.currentLanguage() should return current language code', function () {
        expect(urlParamsProvider.currentLanguage()).to.equal('it');
        expect(urlParams.currentLanguage()).to.equal('it');
    });

    it('urlParams.currentLanguage() should return default language code', function () {
        windowMock.location.pathname = 'something';

        expect(urlParamsProvider.currentLanguage()).to.equal(languagesMock[0]);
        expect(urlParams.currentLanguage()).to.equal(languagesMock[0]);
    });

    it('urlParams.rightPath() should return a string', function () {
        expect(urlParams.rightPath()).to.be.a('string');
    });

    it('urlParams.rightPath() should return complete path after language param', function () {
        expect(urlParams.rightPath()).to.equal('/something?search');
    });
});
