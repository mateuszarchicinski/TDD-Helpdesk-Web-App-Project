'use strict';


// MOCKS
const reqMock = nodeMocksHttp.createRequest();
const resMock = nodeMocksHttp.createResponse();


// PAGES CONFIG
const PAGES_CONFIG = require('../../app.config').PAGES_CONFIG;


// APP MIDDLEWARES
const language = require('../../middlewares/language');


describe('Middlewares:', () => {

    describe('language.js', () => {
        let nextMock;

        beforeEach(() => {
            nextMock = sinon.spy();

            language(reqMock, resMock, nextMock);
        });

        afterEach(() => {

            nextMock = null;

        });

        it('is a function', () => {

            expect(language).to.be.a('function');

        });

        it('should accept only three arguments', () => {

            expect(language.length).to.equal(3);

        });

        it('should call function next()', () => {

            expect(nextMock).to.have.been.calledOnce;

        });

        it(`with wrong language param req.lang.value should return default value: ${PAGES_CONFIG.LANGUAGES[0]}`, () => {

            expect(reqMock.lang.value).to.equal(PAGES_CONFIG.LANGUAGES[0]);

        });

        it('with "pl" language param req.lang.value should return "pl"', () => {
            const reqMockPL = nodeMocksHttp.createRequest({
                params: {
                    lang: 'pl'
                }
            });

            language(reqMockPL, resMock, nextMock);

            expect(reqMockPL.lang.value).to.equal('pl');
        });

        it('with "en" language param req.lang.value should return "en"', () => {
            const reqMockEN = nodeMocksHttp.createRequest({
                params: {
                    lang: 'en'
                }
            });

            language(reqMockEN, resMock, nextMock);

            expect(reqMockEN.lang.value).to.equal('en');
        });

        it('with any language param req.lang.exist should return true', () => {
            const reqMockANY = nodeMocksHttp.createRequest({
                params: {
                    lang: 'plpl'
                }
            });

            language(reqMockANY, resMock, nextMock);

            expect(reqMockANY.lang.exist).to.be.true;
        });

        it('without language param req.lang.exist should return false', () => {

            expect(reqMock.lang.exist).to.be.false;

        });
    });

});
