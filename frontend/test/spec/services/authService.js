'use strict';


describe('Services: authService', function () {
    var userMock,
        auth,
        md5,
        http,
        authToken,
        state;

    beforeEach(module('app'));

    beforeEach(inject(function (_auth_, _md5_, $http, _authToken_, $state) {
        userMock = {
            firstName: 'Mateusz',
            email: 'a@a',
            password: 'aaaaaaaa',
            token: 'token'
        };

        auth = _auth_;

        md5 = _md5_;

        http = $http;
        authToken = _authToken_;
        state = $state;

        sinon.stub(http, 'post').returns({
            then: function (callback) {
                return callback({
                    data: userMock
                });
            }
        });
        sinon.spy(authToken, 'setToken');
        sinon.spy(state, 'go');
    }));

    it('auth should return an object with methods register, login and loginVia', function () {
        expect(auth).to.be.an('object');
        expect(auth).to.have.property('register').that.is.a('function');
        expect(auth).to.have.property('login').that.is.a('function');
        expect(auth).to.have.property('loginVia').that.is.a('function');
    });

    it('auth.register(user) should corectly modified user.password', function () {
        auth.register(userMock);

        expect(userMock.password).to.equal(md5.createHash('aaaaaaaa'));
    });


    it('auth.register(user) should call authToken.setToken(user.token)', function () {
        auth.register(userMock);

        expect(authToken.setToken).to.have.been.calledWith('token');
    });

    it('auth.register(user) should call $state.go("helpdesk")', function () {
        auth.register(userMock);

        expect(state.go).to.have.been.calledWith('helpdesk');
    });

    it('auth.login(user) should corectly modified user.password', function () {
        auth.login(userMock);

        expect(userMock.password).to.equal(md5.createHash('aaaaaaaa'));
    });

    it('auth.login(user) should call authToken.setToken(user.token)', function () {
        auth.login(userMock);

        expect(authToken.setToken).to.have.been.calledWith('token');
    });

    it('auth.login(user) should call $state.go("helpdesk")', function () {
        auth.login(userMock);

        expect(state.go).to.have.been.calledWith('helpdesk');
    });
});
