'use strict';


// MOCKS
const reqMock = nodeMocksHttp.createRequest();
const resMock = nodeMocksHttp.createResponse();
const errorsMock = helpers.ERRORS.MOCK();


// APP CONTROLLERS
const loginController = require('../../controllers/login');


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Controllers:', () => {

    describe('login.js', () => {
        let userMock,
            nextMock;

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

            userModel.find.yields(errorsMock.normal);

            loginController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errorsMock.normal);
        });

        it('ctrl in case of userModel.find() return empty array should call res with status 401 <number> and json {message: "You are..."} <object>', () => {
            reqMock.body = userMock;

            userModel.find.yields(null, []);

            loginController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.unauthorized);
        });

        it('ctrl in case of user.comparePasswords() error should call next(err)', () => {
            userMock.errCompare = errorsMock.normal;
            reqMock.body = userMock;

            userModel.find.yields(null, [userMock]);

            loginController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errorsMock.normal);
        });

        it('ctrl in case of user correct comparing passwords should call res with status 200 <number> and json {firstName: "Aa", email: "a@a", password: "aaaaaaaa"} <object>', () => {
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
            expect(resMock.json).to.have.been.calledWith(errorsMock.unauthorized);
        });
    });

});
