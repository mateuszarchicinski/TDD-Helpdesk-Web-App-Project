'use strict';


// APP ROUTES
const routes = require('../../routes/routes');


describe('Routes:', () => {

    describe('routes.js', () => {
        it('is an array', () => {

            expect(routes).to.be.an('array');

        });

        it('routes <array> should contain only objects', () => {
            routes.forEach((elem) => {
                expect(elem).to.be.an('object');
            });
        });

        it('each object in routes <array> should have property url', () => {
            routes.forEach((elem) => {
                expect(elem).to.have.property('url');
            });
        });

        it('each object property url in routes <array> should be a string or an array of strings e.g. "/newOne" || ["/newOne"]', () => {
            const regExp = /(^\/{1}[a-z0-9-_:{}*\/]{0,50}$|^\*$)/;

            routes.forEach((elem) => {
                let url = elem.url;

                expect(typeof url === 'string' || url instanceof Array).to.be.true;

                if (typeof url === 'string') {
                    expect(url).to.match(regExp);
                }

                if (url instanceof Array) {
                    url.forEach((el) => {
                        expect(el).to.match(regExp);
                    });
                }
            });
        });
    });

});
