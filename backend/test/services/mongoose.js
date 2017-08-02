'use strict';


// APP SERVICES
const mongoose = require('../../services/mongoose');


describe('Services:', () => {

    describe('mongoose.js', () => {
        it('is an object', () => {

            expect(mongoose).to.be.an('object');

        });
    });

});
