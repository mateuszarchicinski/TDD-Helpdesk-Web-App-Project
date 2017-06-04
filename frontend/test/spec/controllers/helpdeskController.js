/* global authMock, successRes, errorCallbackSpy, errorRes */


'use strict';


describe('Controllers: helpdeskController', function () {
    var helpdeskController,
        sinonSpyOnToggle,
        scope,
        userMock;

    beforeEach(module('app'));

    beforeEach(module(function ($provide) {
        sinonSpyOnToggle = sinon.spy();

        $provide.value('$mdSidenav', function () {
            return {
                toggle: sinonSpyOnToggle
            };
        });
    }));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();

        userMock = sinon.spy();
        userMock.isUser = function () {
            return true;
        };
        userMock.getUser = function () {
            return {};
        };

        helpdeskController = $controller('helpdeskController', {
            $scope: scope,
            user: userMock,
            auth: authMock
        });

        sinon.stub(userMock, 'isUser');
    }));

    it('ctrl.toggleSidenav should be a function', function () {
        expect(helpdeskController.toggleSidenav).to.be.a('function');
    });

    it('ctrl.toggleSidenav() should call $mdSidenav("left").toggle() once', function () {
        helpdeskController.toggleSidenav();

        expect(sinonSpyOnToggle).to.have.been.calledOnce;
    });

    it('$scope should have property servicesTmpUrl which is a string', function () {
        expect(scope).to.have.property('servicesTmpUrl').that.is.a('string');
    });

    it('ctrl.getResources should be a function', function () {
        expect(helpdeskController.getResources).to.be.a('function');
    });

    it('ctrl.getResources() on success response should call user(res.data)', function () {
        userMock.isUser.returns(false);
        authMock.statusUser = true;

        helpdeskController.getResources();

        expect(authMock.user).to.have.been.calledOnce;
        expect(userMock).to.have.been.calledWith(successRes.data);
        expect(errorCallbackSpy).to.not.have.been.called;
    });

    it('ctrl.getResources() on error response should call errorCallback(err)', function () {
        userMock.isUser.returns(false);
        authMock.statusUser = false;

        helpdeskController.getResources();

        expect(authMock.user).to.have.been.calledOnce;
        expect(userMock).to.not.have.been.called;
        expect(errorCallbackSpy).to.have.been.calledWith(errorRes);
    });

    it('ctrl.getResources() should not call auth.user', function () {
        userMock.isUser.returns(true);

        helpdeskController.getResources();

        expect(authMock.user).to.not.have.been.calledOnce;
    });
});
