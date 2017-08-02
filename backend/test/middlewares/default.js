'use strict';


// MOCKS
const reqMock = nodeMocksHttp.createRequest({
    protocol: 'https',
    hostname: 'localhost-hostname',
    headers: {
        host: 'localhost-host'
    }
});
const resMock = nodeMocksHttp.createResponse();


// APP MIDDLEWARES
const defMiddleware = require('../../middlewares/default');


describe('Middlewares:', () => {

    describe('default.js', () => {
        let nextMock;

        beforeEach(() => {
            sinon.spy(resMock, 'redirect');
            nextMock = sinon.spy();

            defMiddleware(reqMock, resMock, nextMock);
        });

        afterEach(() => {
            resMock.redirect.restore();
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

        it('req.createFullUrl(path) with path as string or number should return correct url value <string>', () => {
            const stringMock = 'stringMock';
            const numberMock = 100;

            // environment: unknown
            // string
            expect(reqMock.createFullUrl(stringMock)).to.equal(`https://localhost-host/${stringMock}`);

            // number
            expect(reqMock.createFullUrl(numberMock)).to.equal(`https://localhost-host/${numberMock}`);

            // both equal
            expect(reqMock.createFullUrl(stringMock)).to.equal(reqMock.createFullUrl(`/${stringMock}`));
            expect(reqMock.createFullUrl(numberMock)).to.equal(reqMock.createFullUrl(`/${numberMock}`));


            // environment: production
            process.env.NODE_ENV = 'production';

            // string
            expect(reqMock.createFullUrl(stringMock)).to.equal(`https://localhost-hostname/${stringMock}`);

            // number
            expect(reqMock.createFullUrl(numberMock)).to.equal(`https://localhost-hostname/${numberMock}`);

            // both equal
            expect(reqMock.createFullUrl(stringMock)).to.equal(reqMock.createFullUrl(`/${stringMock}`));
            expect(reqMock.createFullUrl(numberMock)).to.equal(reqMock.createFullUrl(`/${numberMock}`));

            delete process.env.NODE_ENV;

            // is a string
            expect(reqMock.createFullUrl(stringMock)).to.be.a('string');
        });

        it('res.redirectTo() should call res.redirect(status, path) correctly', () => {
            resMock.redirectTo();

            expect(resMock.redirect).to.have.been.calledWith(301, 'https://localhost-host');
        });

        it('res.redirectTo(path) should call res.redirect(status, path) correctly', () => {
            resMock.redirectTo('en/dashboard');

            expect(resMock.redirect).to.have.been.calledWith(301, 'https://localhost-host/en/dashboard');
        });

        it('res.redirectTo(path, status) should call res.redirect(status, path) correctly', () => {
            resMock.redirectTo('/en/dashboard', 302);

            expect(resMock.redirect).to.have.been.calledWith(302, 'https://localhost-host/en/dashboard');
        });
    });

});
