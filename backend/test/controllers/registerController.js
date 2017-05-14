'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


// NODE MODULES & MOCKS
const mocks = require('node-mocks-http');
const reqMock = mocks.createRequest();
const resMock = mocks.createResponse();
const nextMock = () => {};
const errMock = {
    message: 'Something like error message!'
};
const userMock = {
    firstName: 'Aa',
    email: 'a@a',
    password: 'aaaaaaaa',
    toJSON: () => {
        const user = userMock;

        delete user.toJSON;

        return user;
    }
};


// APP CONTROLLERS
const registerController = require('../../controllers/registerController');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Controllers:', () => {

    describe('registerController.js', () => {
        beforeEach(() => {
            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');

            sinon.stub(userModel.prototype, 'save');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.json.restore();

            userModel.prototype.save.restore();
        });

        it('ctrl without req.body.firstName/email/password should call res with status 400 <number> and json {message: "Request body..."} <object>', () => {
            registerController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith({
                message: 'Request body do not have specified properties firstName, email or password.'
            });
        });

        it('ctrl with invalid req.body properties should call res with status 400 <number> and json {message: err.message} <object>', () => {
            reqMock.body = userMock;

            userModel.prototype.save.yields(errMock);

            registerController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith(errMock);
        });

        it('ctrl with valid sreq.body properties should call res with status 201 <number> and json {name: "Aa", email: "a@a", password: "aaaaaaaa"} <object>', () => {
            reqMock.body = userMock;

            userModel.prototype.save.yields(null, userMock);

            registerController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(201);
            expect(resMock.json).to.have.been.calledWith(userMock);
        });
    });

});
