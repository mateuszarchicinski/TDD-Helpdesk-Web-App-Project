'use strict';


describe('Models: userFactory', function () {
    var user,
        dataMock;

    beforeEach(module('app'));

    beforeEach(inject(function (_user_) {
        user = _user_;

        dataMock = {
            firstName: 'Mateusz'
        };
    }));

    it('user should return a function with methods set, get, remove, getUser and removeUser', function () {
        expect(user).to.be.a('function');
        expect(user.set).to.be.a('function');
        expect(user.get).to.be.a('function');
        expect(user.remove).to.be.a('function');
        expect(user.getUser).to.be.a('function');
        expect(user.removeUser).to.be.a('function');
    });

    it('user(data) should return a boolean (false)', function () {
        expect(user()).to.be.false;
        expect(user({})).to.be.false;

        // Incase of double save user
        user({
            firstName: 1
        });

        expect(user({
            firstName: 1
        })).to.be.false;
    });

    it('user.set(property, value) should return an undefined and correctly modify user object', function () {
        expect(user.set()).to.be.false;

        user(dataMock);

        expect(user.set('lastName', 'A')).to.be.undefinded;
        expect(dataMock.lastName).to.equal('A');
    });

    it('user.get(property) should return correct value', function () {
        expect(user.get()).to.be.null;

        user(dataMock);

        expect(user.get('firstName')).to.equal('Mateusz');
    });

    it('user.remove(property) should return an undefined and correctly modify user object', function () {
        expect(user.remove()).to.be.false;

        user(dataMock);

        expect(user.remove('firstName')).to.be.undefinded;
        expect(dataMock.firstName).to.be.undefinded;
    });

    it('user.getUser() should return an user object', function () {
        expect(user.getUser()).to.be.null;

        user(dataMock);

        expect(user.getUser()).to.deep.equal(dataMock);
    });

    it('user.removeUser() should return an undefined and correctly remove user object', function () {
        user(dataMock);

        expect(user.removeUser()).to.be.undefined;
        expect(user.getUser()).to.be.null;
    });

    it('user.isUser() should return a boolean (false/true)', function () {
        expect(user.isUser()).to.be.false;

        user(dataMock);

        expect(user.isUser()).to.be.true;
    });
});
