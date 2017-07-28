'use strict';


describe('Services: authTokenFactory', function () {
    var APP_CONFIG,
        authToken,
        token = 'qwertyuiop1234567890';

    beforeEach(module('app'));

    beforeEach(module(function ($provide) {
        APP_CONFIG = {
            tokenConfig: {
                prefix: 'M',
                name: 'mamToken',
                header: 'Mamthorization',
                type: 'Mammoth'
            }
        };

        APP_CONFIG.tokenConfig.fullName = APP_CONFIG.tokenConfig.prefix + '-' + APP_CONFIG.tokenConfig.name;

        $provide.constant('APP_CONFIG', APP_CONFIG);
    }));

    beforeEach(inject(function (_authToken_) {
        authToken = _authToken_;

        authToken.setToken(token);
    }));

    afterEach(function () {
        window.localStorage.clear();
    });

    it('authToken.config should contains properties with custom values', function () {
        expect(authToken.config).to.deep.equal(APP_CONFIG.tokenConfig);
    });

    it('authToken.setToken(token) should set/save token in localStorage', function () {
        expect(window.localStorage).to.deep.equal({
            'M-mamToken': token
        });
    });

    it('authToken.getToken() should return correct token from localStorage', function () {
        expect(authToken.getToken()).to.equal(token);
    });

    it('authToken.getToken() should return cached token', function () {
        window.localStorage.setItem(APP_CONFIG.tokenConfig.fullName, 'newOne');

        expect(authToken.getToken()).to.equal(token);
    });

    it('authToken.removeToken() should remove M-mamToken from localStorage', function () {
        authToken.removeToken();

        expect(window.localStorage).to.deep.equal({});
    });

    it('authToken.isAuthenticated() with token should return true', function () {
        expect(authToken.isAuthenticated()).to.be.true;
    });

    it('authToken.isAuthenticated() without token should return false', function () {
        authToken.removeToken();

        expect(authToken.isAuthenticated()).to.be.false;
    });
});
