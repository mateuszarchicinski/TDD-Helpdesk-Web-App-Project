'use strict';


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let userModel;


describe('Models: user.js', () => {

    describe('Tests with required mongoose connection:', () => {
        before((done) => {
            mongoose.connect(`mongodb://${helpers.MONGO_DB.USER}:${helpers.MONGO_DB.PASSDOWRD}@${helpers.MONGO_DB.HOST}:${helpers.MONGO_DB.PORT}/${helpers.MONGO_DB.NAME}`, helpers.MONGO_DB.OPTIONS, (err) => {
                if (err) {
                    /* eslint-disable */
                    console.log(err.message);
                    /* eslint-enable */
                }

                done();
            });
        });

        before(() => {
            userModel = mongoose.models.User ? mongoose.model('User') : mongoose.model('User', require('../../models/user').schema);
        });

        after((done) => {
            userModel.collection.drop().then(() => {
                done();
            });
        });

        after((done) => {
            mongoose.connection.close().then(() => {
                done();
            });
        });

        it('method user.save() should save new user in a database', (done) => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA);

            /* eslint-disable */
            user.save((err, user) => {
                /* eslint-enable */
                if (err) {
                    throw Error(err);
                }

                done();
            });
        });

        it('method user.save() with user whose email address already exists in a database should return an error', (done) => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA);

            /* eslint-disable */
            user.save((err, user) => {
                /* eslint-enable */
                if (!err) {
                    throw Error(err);
                }

                done();
            });
        });

        it('method user.comparePassword() with correct password as an argument should return true as the second argument in callback', (done) => {
            userModel.findOne({
                email: helpers.USER_MODEL.EXAMPLE_DATA.email
            }, (err, user) => {
                user.comparePasswords(helpers.USER_MODEL.EXAMPLE_DATA.password, (err, status) => {
                    expect(status).to.be.true;

                    done();
                });
            });
        });

        it('method user.comparePassword() with wrong password as an argument should return false as the second argument in callback', (done) => {
            userModel.findOne({
                email: helpers.USER_MODEL.EXAMPLE_DATA.email
            }, (err, user) => {
                user.comparePasswords('wrong_password', (err, status) => {
                    expect(status).to.be.false;

                    done();
                });
            });
        });

        it('new user object should contain properties created and updated', (done) => {
            userModel.findOne({
                email: helpers.USER_MODEL.EXAMPLE_DATA.email
            }, (err, user) => {
                expect(user).to.have.property('created');
                expect(user).to.have.property('updated');

                done();
            });
        });
    });

    describe('Tests without required mongoose connection:', () => {
        it('new user object should contain all required properties with correct values', () => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA).toObject();
            const userEqual = helpers.USER_MODEL.EXAMPLE_DATA;

            userEqual._id = user._id;

            expect(user).to.deep.equal(helpers.USER_MODEL.EXAMPLE_DATA);
        });

        it('method user.toJSON() should return correct user object with removed password and active_tokens properties', () => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA).toJSON();
            const userEqual = helpers.USER_MODEL.EXAMPLE_DATA;

            userEqual._id = user._id;

            delete userEqual.password;
            delete userEqual.active_tokens;

            expect(user).to.deep.equal(userEqual);
        });

        it('method user.isActiveToken(token_existing) should return true', () => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA);
            user.active_tokens.push('token');

            expect(user.isActiveToken('token')).to.be.true;
        });

        it('method user.isActiveToken(token_not_existing) should return false', () => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA);

            expect(user.isActiveToken('token')).to.be.false;
        });

        it('method user.removeToken(token) should remove selected token correctly', () => {
            const user = new userModel(helpers.USER_MODEL.EXAMPLE_DATA);
            user.active_tokens.push('token');

            expect(user.active_tokens).to.contains('token');

            user.removeToken('token');

            expect(user.active_tokens).to.not.contains('token');
        });
    });

});
