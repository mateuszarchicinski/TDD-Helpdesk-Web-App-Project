'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);


// NODE MODULES
const mocks = require('node-mocks-http');
const reqMock = mocks.createRequest();
const resMock = mocks.createResponse();


// APP MIDDLEWARES
const defMiddleware = require('../../middlewares/default');


describe('Middlewares:', () => {

    describe('default.js', () => {
        let nextMock;

        beforeEach(() => {
            nextMock = sinon.spy();

            defMiddleware(reqMock, resMock, nextMock);
        });

        afterEach(() => {

            nextMock = null;

        });

        it('is a function', () => {

            expect(defMiddleware).to.be.a('function');

        });

        it('should accept only three arguments', () => {

            expect(defMiddleware.length).to.equal(3);

        });

        it('should call function next()', () => {

            expect(nextMock).to.have.been.calledOnce;

        });

        it('req.createFullUrl is a function', () => {

            expect(reqMock.createFullUrl).to.be.a('function');

        });

        it('req.createFullUrl(path) with path as string or number should return correct url value (string)', () => {
            const stringMock = 'stringMock';
            const numberMock = 100;

            // string
            expect(reqMock.createFullUrl(stringMock)).to.equal(`undefined://undefined/${stringMock}`);

            // number
            expect(reqMock.createFullUrl(numberMock)).to.equal(`undefined://undefined/${numberMock}`);

            // both equal
            expect(reqMock.createFullUrl(stringMock)).to.equal(reqMock.createFullUrl(`/${stringMock}`));
            expect(reqMock.createFullUrl(numberMock)).to.equal(reqMock.createFullUrl(`/${numberMock}`));

            // is a string
            expect(reqMock.createFullUrl(stringMock)).to.be.a('string');
        });
    });

});
