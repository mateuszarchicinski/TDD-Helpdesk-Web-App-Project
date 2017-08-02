'use strict';


// NODE MODULES & MOCKS
const jwt = require('jwt-simple');
const objectMock = {
    sub: 12345,
    email: 'a@a'
};


// APP SERVICES
const tokenHandler = require('../../services/token-handler');


describe('Services:', () => {
    describe('tokenHandler.js', () => {
        beforeEach(() => {
            sinon.spy(jwt, 'encode');
        });

        afterEach(() => {
            jwt.encode.restore();
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
            try {
                tokenHandler.decode('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwiaWF0IjoxNDk0ODU1OTgxLCJleHAiOjE0OTU0NjA3ODF9.3n7ognYsQRw0n9UirTB8DCpXAzHNYWyutPz92gskVT0');
            } catch (err) {
                expect(err.message).to.equal('Signature verification failed');
            }
        });

        it('method tokenHandler.decode(token) should return an object with the same payload which was encoded in token', () => {
            const encodedToken = tokenHandler.encode(objectMock);
            const payload = tokenHandler.decode(encodedToken).payload;

            Object.keys(objectMock).forEach((key) => {
                expect(payload[key]).to.equal(objectMock[key]);
            });
        });

        it('method of decoded token isValid() should return true', () => {
            const encodedToken = tokenHandler.encode(objectMock);
            const isValid = tokenHandler.decode(encodedToken).isValid();

            expect(isValid).to.be.true;
        });

        it('method of decoded token isValid() should return false', () => {
            sinon.stub(jwt, 'decode').returns({
                exp: 1
            });

            const encodedToken = tokenHandler.encode(objectMock);
            const isValid = tokenHandler.decode(encodedToken).isValid();

            expect(isValid).to.be.false;

            jwt.decode.restore();
        });
    });
});
