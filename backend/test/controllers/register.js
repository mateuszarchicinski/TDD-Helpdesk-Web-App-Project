'use strict';


// MOCKS
const reqMock = nodeMocksHttp.createRequest({
    createFullUrl: () => {}
});
const resMock = nodeMocksHttp.createResponse();
const errorsMock = helpers.ERRORS.MOCK();


// APP CONTROLLERS
const registerController = require('../../controllers/register');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Controllers:', () => {

    describe('register.js', () => {
        let userMock,
            nextMock;

        beforeEach(() => {
            userMock = helpers.USER_MODEL.MOCK();

            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');
            nextMock = sinon.spy();

            sinon.stub(userModel.prototype, 'save');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.json.restore();
            nextMock = null;

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

            userModel.prototype.save.yields(errorsMock.validation);

            registerController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith({
                message: errorsMock.validation.message
            });
        });

        it('ctrl in case of user.save() error should call next(err)', () => {
            reqMock.body = userMock;

            userModel.prototype.save.yields(errorsMock.normal);

            registerController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errorsMock.normal);
        });

        it('ctrl with valid req.body properties should call res with status 201 <number> and json {name: "Aa", email: "a@a", password: "aaaaaaaa"} <object>', () => {
            reqMock.body = userMock;

            userModel.prototype.save.yields(null, userMock);

            registerController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(201);
            expect(resMock.json).to.have.been.calledWith(userMock);
        });
    });

});
