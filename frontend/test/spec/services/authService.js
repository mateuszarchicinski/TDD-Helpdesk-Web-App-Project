'use strict';


describe('Services: authService', function () {
    var auth;

    beforeEach(module('app'));

    beforeEach(inject(function (_auth_) {
        auth = _auth_;
    }));

    it('auth should return an object with methods register, login and loginVia', function () {
        expect(auth).to.be.an('object');
        expect(auth).to.have.property('register').that.is.a('function');
        expect(auth).to.have.property('login').that.is.a('function');
        expect(auth).to.have.property('loginVia').that.is.a('function');
    });
});
