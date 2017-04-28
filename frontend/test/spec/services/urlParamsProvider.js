'use strict';


describe('Services: urlParamsProvider', function () {
    var urlParams;

    beforeEach(module(function ($provide) {
        var windowMock = {
            location: {
                pathname: '/en/something',
                search: '?search'
            }
        };

        $provide.value('$window', windowMock);
    }));

    beforeEach(function () {
        module('app');

        inject(function (_urlParams_) {
            urlParams = _urlParams_;
        });
    });

    it('urlParams.currentLanguage() should return a string', function () {
        expect(urlParams.currentLanguage()).to.be.a('string');
    });

    it('urlParams.currentLanguage() should return current language code', function () {
        expect(urlParams.currentLanguage()).to.equal('en');
    });

    it('urlParams.rightPath() should return a string', function () {
        expect(urlParams.rightPath()).to.be.a('string');
    });

    it('urlParams.rightPath() should return complete path after language param', function () {
        expect(urlParams.rightPath()).to.equal('/something?search');
    });
});
