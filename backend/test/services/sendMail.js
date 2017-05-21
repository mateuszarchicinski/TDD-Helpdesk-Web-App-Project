'use strict';


// CHAI & SINON
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);


// APP SERVICES
const sendMail = require('../../services/sendMail');
const tokenHandler = require('../../services/tokenHandler');


describe('Services:', () => {
    beforeEach(() => {
        sinon.stub(tokenHandler, 'encode').returns('token');
    });

    afterEach(() => {
        tokenHandler.encode.restore();
    });

    describe('sendMail.js', () => {
        it('is a function', () => {
            expect(sendMail).to.be.a('function');
        });

        it('sendMail() should return undefined', (done) => {
            sendMail().then(() => {}, (err) => {
                expect(err).to.be.undefined;

                done();
            });
        });

        it('sendMail(user, config) without config.type should return undefined', (done) => {
            sendMail({}, {}).then(() => {}, (err) => {
                expect(err).to.be.undefined;

                done();
            });
        });

        it('sendMail({email: "a@a"}, {type: "verificationEmail"}) should add to object config properties from, to, subject and html with correct values', (done) => {
            const user = {
                email: 'a@a'
            };
            const config = {
                type: 'verificationEmail'
            };

            sendMail(user, config).then(() => {
                expect(config.from).to.equal('Helpdesk Application <admin@helpdesk-application.com>');
                expect(config.to).to.equal('a@a');
                expect(config.subject).to.equal('Email verification');
                expect(config.html).to.equal('<p>Verify your email address by clicking on <a href="http://localhost:4848/verification/email?token=token">activate link</a>.</p>');

                done();
            }).catch(() => {
                done();
            });
        });
    });
});
