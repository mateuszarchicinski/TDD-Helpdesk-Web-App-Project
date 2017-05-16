'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


// NODE MODULES & MOCKS
const jwt = require('jwt-simple');


// APP SERVICES
const tokenHandler = require('../../services/tokenHandler');


describe('Services:', () => {
    describe('tokenHandler.js', () => {
        beforeEach(() => {
            sinon.spy(jwt, 'encode');
            sinon.spy(jwt, 'decode');
        });

        afterEach(() => {
            jwt.encode.restore();
            jwt.decode.restore();
        });

        it('is an object which contains encode and decode methods', () => {
            expect(tokenHandler).to.be.an('object');
            expect(tokenHandler.encode).to.be.a('function');
            expect(tokenHandler.decode).to.be.a('function');
        });

        it('method tokenHandler.encode(subject) should call jwt.encode(payload, secret) once', () => {
            tokenHandler.encode({});

            expect(jwt.encode).to.have.been.calledOnce;
        });

        it('method tokenHandler.decode(token) should call jwt.decode(token) once', () => {
            tokenHandler.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwiaWF0IjoxNDk0ODU1OTgxLCJleHAiOjE0OTU0NjA3ODF9.3n7ognYsQRw0n9UirTB8DCpXAzHNYWyutPz92gskVT0');

            expect(jwt.decode).to.have.been.calledOnce;
        });

        it('method tokenHandler.decode(token) should return an object with the same subject which was encoded in token', () => {
            const object = {
                sub: 12345,
                email: 'a@a'
            };
            const encodedToken = tokenHandler.encode(object);
            const decodedToken = tokenHandler.decode(encodedToken);

            Object.keys(object).forEach((key) => {
                expect(decodedToken[key]).to.equal(object[key]);
            });
        });
    });
});
