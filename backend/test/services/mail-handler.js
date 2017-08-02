'use strict';


// APP SERVICES
const mailHandler = require('../../services/mail-handler');
const tokenHandler = require('../../services/token-handler');


describe('Services:', () => {
    describe('mailHandler.js', () => {
        beforeEach(() => {
            sinon.stub(tokenHandler, 'encode').returns('token');
        });

        afterEach(() => {
            tokenHandler.encode.restore();
        });

        it('is a function', () => {
            expect(mailHandler).to.be.a('function');
        });

        it('mailHandler() without any arguments should return false', (done) => {
            mailHandler().then((info) => {
                /* eslint-disable */
                console.log(info);
                /* eslint-enable */

                done();
            }, (err) => {
                expect(err).to.be.false;

                done();
            });
        });

        it('mailHandler(config, user) without property type in config object <config.type> should return false', (done) => {
            mailHandler({}, {}).then((info) => {
                /* eslint-disable */
                console.log(info);
                /* eslint-enable */

                done();
            }, (err) => {
                expect(err).to.be.false;

                done();
            });
        });

        it('mailHandler({type: "verification-email"}, {email: "a@a"}) should add to object config properties from, to, subject and html with correct values', () => {
            const user = {
                email: 'a@a'
            };
            const config = {
                type: 'verification_email'
            };

            mailHandler(config, user).catch((err) => {
                /* eslint-disable */
                console.log(err);
                /* eslint-enable */
            });

            expect(config).to.deep.equal({
                type: 'verification_email',
                from: '[Restful API] <admin@helpdesk-app.mateusz-archicinski.pl>',
                to: 'a@a',
                subject: 'Email verification',
                html: '<p>Verify your email address by clicking on <a href="undefined/verification/email?token=token">activate link</a>.</p>'
            });
        });
    });
});
