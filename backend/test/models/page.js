'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


// LOCAL MODULES
const Page = require('../../models/page.js');


describe('Models:', () => {

    describe('page.js', () => {

        it('is a function', () => {

            expect(Page).to.be.a('function');

        });

        it('constructor name is Page', () => {

            expect(new Page({
                name: 'test',
                url: '/test',
                fileName: 'test'
            }).constructor.name).to.equal('Page');

        });

        it('constructor without any arguments should throw an error', () => {
            let error;

            try {
                new Page();
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Page constructor does not pass test.');
                }
            }
        });

        it('constructor without specified name object should throw an error', () => {
            let error;

            try {
                new Page({
                    url: '/test',
                    fileName: 'test'
                });
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Page constructor does not pass test.');
                }
            }
        });

        it('constructor without specified url object should throw an error', () => {
            let error;

            try {
                new Page({
                    name: 'test',
                    fileName: 'test'
                });
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Page constructor does not pass test.');
                }
            }
        });

        it('constructor without specified fileName object should throw an error', () => {
            let error;

            try {
                new Page({
                    name: 'test',
                    url: '/test'
                });
            } catch (e) {
                error = e;
            } finally {
                if (!error) {
                    throw Error('Page constructor does not pass test.');
                }
            }
        });

        it('constructor with specified required object properties (name, url and fileName) should return an new object', () => {

            expect(new Page({
                name: 'test',
                url: '/test',
                fileName: 'test'
            })).to.be.an('object');

        });

        it('constructor without specified first three arguments (name, url and fileName) should throw an error', () => {
            let errorCounter = 0;

            try {
                new Page('test', '/test');
            } catch (e) {
                errorCounter++;
            }

            try {
                new Page('test');
            } catch (e) {
                errorCounter++;
            }

            if (errorCounter !== 2) {
                throw Error('Page constructor does not pass test.');
            }
        });

        it('constructor with specified required first three arguments (name, url and fileName) should return an new object', () => {

            expect(new Page('test', '/test', 'test')).to.be.an('object');

        });

    });

});
