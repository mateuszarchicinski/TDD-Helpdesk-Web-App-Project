'use strict';


// APP MIDDLEWARES
const middlewares = require('../../middlewares/middlewares');


describe('Middlewares:', () => {

    describe('middlewares.js', () => {
        it('is an instance of an array', () => {

            expect(middlewares).to.be.an.instanceof(Array);

        });

        it('an array should contain only functions', () => {

            middlewares.forEach((elem) => {

                expect(elem).to.be.a('function');

            });

        });
    });

});
