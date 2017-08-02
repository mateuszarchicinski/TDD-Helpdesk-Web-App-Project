'use strict';


// APP MODULES
const app = require('../app.source');


describe('Application modules:', () => {

    describe('app.source.js', () => {
        it('is an object', () => {

            expect(app).to.be.an('object');

        });
    });

});
