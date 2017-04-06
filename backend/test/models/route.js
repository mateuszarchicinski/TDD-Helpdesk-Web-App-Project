'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// LOCAL MODULES
const Route = require('../../models/route.js');


describe('Models:', () => {

    describe('route.js', () => {

        it('is a function', () => {

            expect(Route).to.be.a('function');

        });

        it('constructor name is Route', () => {

            expect(new Route({
                url: '/test'
            }).constructor.name).to.equal('Route');

        });

        it('constructor without any arguments should throw an error', () => {
            let error;

            try {
                new Route();
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Route constructor does not pass test.');
                }
            }
        });

        it('constructor without specified object property url should throw an error', () => {
            let error;

            try {
                new Route({});
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Route constructor does not pass test.');
                }
            }
        });

        it('constructor with specified required object property url should return an new object', () => {

            expect(new Route({
                url: '/test'
            })).to.be.an('object');

        });

        it('constructor with specified required first argument url should return an new object', () => {

            expect(new Route('test')).to.be.an('object');

        });

        it('constructor with specified wrong object property method should throw an error', () => {
            let error;

            try {
                new Route({
                    url: '/test',
                    method: 'test'
                });
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Route constructor does not pass test.');
                }
            }
        });

        it('constructor with specified wrong second argument method should throw an error', () => {
            let error;

            try {
                new Route('/test', 'test');
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw error;
                    throw Error('Route constructor does not pass test.');
                }
            }
        });

    });

});
