/* eslint-disable */


var eventMock,
    authMock,
    successRes,
    errorRes,
    errorCallbackSpy;


beforeEach(function () {
    eventMock = {
        preventDefault: function () {}
    };


    authMock = {
        statusReg: null,
        register: function () {
            return {
                then: function (successCallback, errorCallback) {
                    return authMock.statusReg ? successCallback(successRes) : errorCallbackSpy(errorRes);
                }
            };
        },
        statusLog: null,
        login: function () {
            return {
                then: function (successCallback, errorCallback) {
                    return authMock.statusLog ? successCallback(successRes) : errorCallbackSpy(errorRes);
                }
            };
        },
        statusOut: null,
        logout: function () {
            return {
                then: function (successCallback, errorCallback) {
                    return authMock.statusOut ? successCallback(successRes) : errorCallbackSpy(errorRes);
                }
            };
        },
        statusUser: null,
        user: function () {
            return {
                then: function (successCallback, errorCallback) {
                    return authMock.statusUser ? successCallback(successRes) : errorCallbackSpy(errorRes);
                }
            };
        },
        statusVia: null,
        loginVia: function () {
            return {
                then: function (successCallback, errorCallback) {
                    return authMock.statusVia ? successCallback(successRes) : errorCallbackSpy(errorRes);
                }
            };
        }
    };


    successRes = {
        data: {
            token: 'token'
        }
    };


    errorRes = {
        data: {
            message: 'Error message!'
        }
    };


    errorCallbackSpy = sinon.spy();


    sinon.spy(eventMock, 'preventDefault');
    sinon.spy(authMock, 'register');
    sinon.spy(authMock, 'login');
    sinon.spy(authMock, 'logout');
    sinon.spy(authMock, 'user');
    sinon.spy(authMock, 'loginVia');
});


afterEach(function () {

});
