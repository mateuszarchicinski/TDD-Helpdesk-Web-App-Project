'use strict';

// MOCKS
const reqMock = nodeMocksHttp.createRequest();
const resMock = nodeMocksHttp.createResponse();
const nextMock = () => {};


// APP CONTROLLERS
const mainController = require('../../controllers/main');


describe('Controllers:', () => {

    describe('main.js', () => {
        beforeEach(() => {

            sinon.spy(resMock, 'send');

        });

        afterEach(() => {

            resMock.send.restore();

        });

        it('is a function', () => {

            expect(mainController).to.be.a('function');

        });

        it('should accept only three arguments', () => {

            expect(mainController.length).to.equal(3);

        });

        it('should call function res.send() with default message', () => {
            mainController(reqMock, resMock, nextMock);

            expect(resMock.send).to.always.have.been.calledWith('Main Controller: Hello World!');
        });
    });

});
