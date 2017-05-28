'use strict';


describe('Services: authInterceptorFactory', function () {
    var authInterceptor,
        configMock,
        authToken,
        user,
        scope,
        q;

    beforeEach(module('app'));

    beforeEach(inject(function (_authInterceptor_, _authToken_, _user_, $rootScope, $q) {
        authInterceptor = _authInterceptor_;

        authToken = _authToken_;
        user = _user_;
        scope = $rootScope.$new();

        sinon.spy(authToken, 'removeToken');
        sinon.spy(user, 'removeUser');
        sinon.spy(scope, '$emit');

        q = $q;
    }));

    beforeEach(function () {
        configMock = {
            headers: {}
        };

        localStorage.clear();
    });

    it('authInterceptor should return an object with methods request, requestError, response, responseError', function () {
        expect(authInterceptor).to.be.an('object');
        expect(authInterceptor).to.have.property('request').that.is.a('function');
        expect(authInterceptor).to.have.property('requestError').that.is.a('function');
        expect(authInterceptor).to.have.property('response').that.is.a('function');
        expect(authInterceptor).to.have.property('responseError').that.is.a('function');
    });

    it('authInterceptor.request(config) should return config without Authorization header', function () {
        expect(authInterceptor.request(configMock).headers).to.not.have.property('Authorization');
    });

    it('authInterceptor.request(config) should return config with Authorization header which contains token with prefix Bearer', function () {
        authToken.setToken('token');

        expect(authInterceptor.request(configMock).headers.Authorization).to.equal('Bearer token');
    });

    it('authInterceptor.requestError({}) should return rejected promise with object without any changes', function () {
        expect(authInterceptor.requestError({})).to.deep.equal(q.reject({}));
    });

    it('authInterceptor.response({}) should return object without any changes', function () {
        expect(authInterceptor.response({})).to.deep.equal({});
    });

    it('authInterceptor.responseError({}) should return rejected promise with object without any changes', function () {
        expect(authInterceptor.responseError({})).to.deep.equal(q.reject({}));
        expect(authToken.removeToken).to.not.have.been.calledOnce;
        expect(scope.$emit).to.not.have.been.calledOnce;
    });

    it('authInterceptor.responseError({status: 401, statusText: "Unauthorized"}) should call authToken.removeToken(), user.removeUser() and $rootScope.$emit("Unauthorized", resErr.data)', function () {
        var resErrMock = {
            data: {},
            status: 401,
            statusText: 'Unauthorized'
        };

        authToken.setToken('token');

        expect(authInterceptor.responseError(resErrMock)).to.deep.equal(q.reject(resErrMock));
        expect(authToken.removeToken).to.have.been.calledOnce;
        expect(user.removeUser).to.have.been.calledOnce;
        expect(scope.$emit).to.not.have.been.calledWith('Unauthorized', resErrMock.data);
    });
});
