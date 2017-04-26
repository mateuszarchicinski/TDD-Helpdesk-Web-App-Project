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
const nextMock = () => {};


// APP CONTROLLERS
const mainController = require('../../controllers/mainController');


describe('Controllers:', () => {

    describe('mainController.js', () => {
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
