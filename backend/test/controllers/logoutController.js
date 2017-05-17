'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const helpers = require('../helpers/helpers');


// NODE MODULES & MOCKS
const mocks = require('node-mocks-http');
const resMock = mocks.createResponse();
const errsMock = helpers.ERRORS.MOCK();


// APP CONTROLLERS
const logoutController = require('../../controllers/logoutController');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Controllers:', () => {

    describe('logoutController.js', () => {
        let reqMock,
            nextMock,
            userMock;

        beforeEach(() => {
            reqMock = mocks.createRequest({
                user: {
                    token: 'token'
                }
            });
            userMock = helpers.USER_MODEL.MOCK();
            userMock.active_tokens.push('token');

            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');
            sinon.spy(resMock, 'end');
            nextMock = sinon.spy();
            sinon.spy(userMock, 'save');

            sinon.stub(userModel, 'find');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.json.restore();
            resMock.end.restore();
            nextMock = null;
            userMock.save.restore();

            userModel.find.restore();
        });

        it('ctrl in case of error user.find() method should call next(err)', () => {
            userModel.find.yields(errsMock.normal);

            logoutController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errsMock.normal);
        });

        it('ctrl in case of user.find() method return empty array should call res with status 400 <number> and json {message: "User not..."} <object>', () => {
            userModel.find.yields(null, []);

            logoutController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith(errsMock.usernotfound);
        });

        it('should remove requested token from user.active_tokens', () => {
            userModel.find.yields(null, [userMock]);

            expect(userMock.active_tokens).to.contains('token');

            logoutController(reqMock, resMock, nextMock);

            expect(userMock.active_tokens).to.not.contains('token');
        });

        it('should call method user.save()', () => {
            userModel.find.yields(null, [userMock]);

            logoutController(reqMock, resMock, nextMock);

            expect(userMock.save).to.have.been.calledOnce;
        });


        it('should call res with status 200 <number> and end <empty>', () => {
            userModel.find.yields(null, [userMock]);

            logoutController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(200);
            expect(resMock.end).to.have.been.calledWith();
        });
    });

});
