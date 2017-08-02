'use strict';


// MOCKS
const resMock = nodeMocksHttp.createResponse();
const errorsMock = helpers.ERRORS.MOCK();


// APP MIDDLEWARES
const ensureAuthentication = require('../../middlewares/ensure-authentication');


// APP SERVICES
const mongoose = require('../../services/mongoose');
const tokenHandler = require('../../services/token-handler');


// APP MODELS
const userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);


describe('Middlewares:', () => {

    describe('ensureAuthentication.js', () => {
        let reqMock,
            nextMock,
            userMock,
            tokenHandlerMock;

        beforeEach(() => {
            reqMock = nodeMocksHttp.createRequest({
                headers: {
                    'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0OTUwMjkzMjgsImV4cCI6MTQ5NTYzNDEyOCwic3ViIjoiNTkxYzU2NTA0ZGQ5NTYzNTdjYWJkNjFkIiwiZW1haWwiOiJhQGFhIiwiZGV2aWNlIjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgNi4xOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTYuMC4yOTI0Ljc2IFNhZmFyaS81MzcuMzYifQ.52fiD8ylZE-bRHpnp-PoRIJP4VsfoVy3xEXZsNugZNY',
                    'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'
                }
            });
            userMock = helpers.USER_MODEL.MOCK();

            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'json');
            nextMock = sinon.spy();

            tokenHandlerMock = helpers.TOKEN_HANDLER.MOCK(reqMock);
            sinon.stub(tokenHandler, 'decode').returns(tokenHandlerMock);
            sinon.stub(userModel, 'find');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.json.restore();
            nextMock = null;

            tokenHandler.decode.restore();
            userModel.find.restore();
        });

        it('without request authorization header should call res with status 401 <number> and json {message: "Please make..."} <object>', () => {
            delete reqMock.headers.authorization;

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith({
                message: 'Please make sure your request has an Authorization header.'
            });
        });

        it('with authorization token which throws an exception should call res with status 401 <number> and json {message: err.message} <object>', () => {
            tokenHandler.decode.throws(errorsMock.normal);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.normal);
        });

        it('with a not compatible device which sent request to token.payload.device should call res with status 401 <number> and json {message: "You are..."} <object>', () => {
            delete tokenHandlerMock.payload.device;

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.unauthorized);
        });

        it('in case of error userModel.find() method should call next(err)', () => {
            userModel.find.yields(errorsMock.normal);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errorsMock.normal);
        });

        it('in case of no user is found should call res with status 401 <number> and json {message: "You are..."} <object>', () => {
            userModel.find.yields(null, []);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.unauthorized);
        });

        it('with valid and active token should add property user to req', () => {
            userMock.active_tokens.push(tokenHandlerMock.encoded);
            tokenHandlerMock.v = true;

            userModel.find.yields(null, [userMock]);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(reqMock.user).to.deep.equal(userMock);
        });

        it('in case of expired or inactive token should call res with status 401 <number> and json {message: "Your token..."} <object>', () => {
            userModel.find.yields(null, [userMock]);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.expires);
        });

        it('should remove expired token which is still assigned to user.active_tokens property and call res with status 401 <number> and json {message: "Your token..."} <object>', () => {
            userMock.active_tokens.push(tokenHandlerMock.encoded);

            userModel.find.yields(null, [userMock]);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(userMock.active_tokens).to.be.empty;
            expect(resMock.status).to.have.been.calledWith(401);
            expect(resMock.json).to.have.been.calledWith(errorsMock.expires);
        });

        it('in case of error user.save() method should call next(err)', () => {
            userMock.active_tokens.push(tokenHandlerMock.encoded);
            userMock.errSave = errorsMock.normal;

            userModel.find.yields(null, [userMock]);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledWith(errorsMock.normal);
        });

        it('in case of ValidationError user.save() method should call res with status 400 <number> and json {message: err.message} <object>', () => {
            userMock.active_tokens.push(tokenHandlerMock.encoded);
            userMock.errSave = errorsMock.validation;

            userModel.find.yields(null, [userMock]);

            ensureAuthentication(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(400);
            expect(resMock.json).to.have.been.calledWith({
                message: errorsMock.validation.message
            });
        });
    });

});
