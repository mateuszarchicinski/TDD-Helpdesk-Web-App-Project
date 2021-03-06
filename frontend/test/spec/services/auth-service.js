'use strict';


describe('Services: authService', function () {
    var userMock,
        auth,
        md5,
        http,
        q,
        window,
        APP_CONFIG;

    beforeEach(module('app'));

    beforeEach(inject(function (_auth_, _md5_, $http, $q, $window, _APP_CONFIG_) {
        userMock = {
            _id: '12345678',
            firstName: 'Mateusz',
            email: 'a@a',
            password: 'aaaaaaaa',
            confirmPassword: 'aaaaaaaa',
            token: 'an-example-token'
        };

        auth = _auth_;
        md5 = _md5_;
        http = $http;
        q = $q;
        window = $window;
        APP_CONFIG = _APP_CONFIG_;

        if (!APP_CONFIG.apiConfig.baseUrl) {
            APP_CONFIG.apiConfig.baseUrl = '/';
        }

        sinon.spy(http, 'post');
        sinon.spy(http, 'get');
        sinon.spy(http, 'put');
        sinon.spy(http, 'delete');
        sinon.spy(window, 'open');
    }));

    afterEach(function () {
        window.open.restore();
    });

    it('auth should return an object with methods register, login, logout, user and loginVia', function () {
        expect(auth).to.be.an('object');
        expect(auth).to.have.property('register').that.is.a('function');
        expect(auth).to.have.property('login').that.is.a('function');
        expect(auth).to.have.property('logout').that.is.a('function');
        expect(auth).to.have.property('user').that.is.a('function');
        expect(auth).to.have.property('loginVia').that.is.a('function');
    });

    it('auth.register(user) should corectly modified user.password', function () {
        auth.register(userMock);

        expect(userMock.password).to.equal(md5.createHash('aaaaaaaa'));
    });

    it('auth.register(user) should call $http.post(url, user) with correct arguments', function () {
        auth.register(userMock);

        expect(http.post).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/register', userMock);
    });

    it('auth.login(user) should corectly modified user.password', function () {
        auth.login(userMock);

        expect(userMock.password).to.equal(md5.createHash('aaaaaaaa'));
    });

    it('auth.login(user) should call $http.post(url, user) with correct arguments', function () {
        auth.login(userMock);

        expect(http.post).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/login', userMock);
    });

    it('auth.logout() should call $http.post(url, user) with correct arguments', function () {
        auth.logout();

        expect(http.post).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/logout', null);
    });

    it('auth.user("read/update/delete") should return an instance of $q', function () {
        expect(auth.user()).to.be.instanceof(q);
    });

    it('auth.user("read") should call $http.get(url, user) with correct arguments', function () {
        auth.user('read');

        expect(http.get).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/user', null);
    });

    it('auth.user("update") should call $http.put(url, user) with correct arguments', function () {
        auth.user('update', userMock);

        expect(http.put).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/user/' + userMock._id, userMock);
    });

    it('auth.user("delete") should call $http.delete(url, user) with correct arguments', function () {
        auth.user('delete');

        expect(http.delete).to.have.been.calledWith(APP_CONFIG.apiConfig.baseUrl + 'auth/user', null);
    });

    it('auth.loginVia(provider) should call $window.open once', function () {
        auth.loginVia('facebook');
        auth.loginVia('facebook');

        expect(window.open).to.have.been.calledOnce;

    });

    it('auth.loginVia(provider) should call $window.open twice', function () {
        auth.loginVia('facebook');
        auth.loginVia('google');

        expect(window.open).to.have.been.calledTwice;

    });
});
