'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const helpers = require('../helpers/helpers');


// NODE MODULES & MOCKS
const mocks = require('node-mocks-http');
const reqMock = mocks.createRequest();
const resMock = mocks.createResponse();
const errMock = {
    message: 'Something like error message!'
};
const errUnauthorizedMock = {
    message: 'You are not authorized!'
};


// APP CONTROLLERS
const loginController = require('../../controllers/loginController');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Controllers:', () => {

    describe('loginController.js', () => {
        let nextMock,
            userMock;

        beforeEach(() => {
            userMock = helpers.USER_MODEL.MOCK();

            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');
            nextMock = sinon.spy();

            sinon.stub(userModel, 'find');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.json.restore();
            nextMock = null;

            userModel.find.restore();
        });

        it('ctrl without req.body.email/password should call res with status 400 <number> and json {message: "Request body..."} <object>', () => {
            loginController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith({
                message: 'Request body do not have specified properties email or password.'
            });
        });

        it('ctrl in case of userModel.find() error should call next(err)', () => {
            reqMock.body = userMock;

            userModel.find.yields(errMock);

            loginController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errMock);
        });

        it('ctrl in case of userModel.find() return empty array should call res with status 401 <number> and json {message: "You are..."} <object>', () => {
            reqMock.body = userMock;

            userModel.find.yields(null, []);

            loginController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errUnauthorizedMock);
        });

        it('ctrl in case of user.comparePasswords() error should call next(err)', () => {
            userMock.errCompare = errMock;
            reqMock.body = userMock;

            userModel.find.yields(null, [userMock]);

            loginController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errMock);
        });

        it('ctrl in case of user correct comparing passwords should call res with status 200 <number> and json {name: "Aa", email: "a@a", password: "aaaaaaaa"} <object>', () => {
            reqMock.body = userMock;

            userModel.find.yields(null, [userMock]);

            loginController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(200);
            expect(resMock.json).to.have.been.calledWith(userMock);
        });

        it('ctrl in case of user incorrect comparing passwords should call res with status 401 <number> and json {message: "You are..."} <object>', () => {
            reqMock.body = {
                firstName: 'Aa',
                email: 'a@a',
                password: 'wrong_password'
            };

            userModel.find.yields(null, [userMock]);

            loginController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errUnauthorizedMock);
        });
    });

});
