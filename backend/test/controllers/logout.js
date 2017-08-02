'use strict';


// MOCKS
const resMock = nodeMocksHttp.createResponse();
const errorsMock = helpers.ERRORS.MOCK();


// APP CONTROLLERS
const logoutController = require('../../controllers/logout');


describe('Controllers:', () => {

    describe('logout.js', () => {
        let reqMock,
            nextMock;

        beforeEach(() => {
            reqMock = nodeMocksHttp.createRequest({
                user: helpers.USER_MODEL.MOCK()
            });
            reqMock.user.active_tokens.push('token');
            reqMock.user.token = 'token';

            sinon.spy(resMock, 'status');
            sinon.spy(resMock, 'end');
            nextMock = sinon.spy();
            sinon.spy(reqMock.user, 'save');
        });

        afterEach(() => {
            resMock.status.restore();
            resMock.end.restore();
            nextMock = null;
            reqMock.user.save.restore();
        });

        it('should remove an active/requested token from user.active_tokens', () => {
            expect(reqMock.user.active_tokens).to.contains('token');

            logoutController(reqMock, resMock, nextMock);

            expect(reqMock.user.active_tokens).to.not.contains('token');
        });

        it('should call once method user.save()', () => {
            logoutController(reqMock, resMock, nextMock);

            expect(reqMock.user.save).to.have.been.calledOnce;
        });


        it('should call once next(err)', () => {
            reqMock.user.errSave = errorsMock.normal;

            logoutController(reqMock, resMock, nextMock);

            expect(nextMock).to.have.been.calledOnce.and.calledWith(errorsMock.normal);
        });

        it('should call res with status 204 <number> and end <empty>', () => {
            logoutController(reqMock, resMock, nextMock);

            expect(resMock.status).to.have.been.calledWith(204);
            expect(resMock.end).to.have.been.calledWith();
        });
    });

});
