'use strict';


// CHAI SETUP & HELPERS
const chai = require('chai');
const expect = chai.expect;


//NODE MODULESconst app = new require('express')();
const app = new require('express')();


// LOCAL MODULES
const routesInjector = require('../../helpers/routesInjector');


describe('Helpers:', () => {

    describe('routesInjector.js', () => {
        it('is a function', () => {

            expect(routesInjector).to.be.a('function');

        });

        it('without any arguments should returns false', () => {

            expect(routesInjector()).to.be.false;

        });

        it('without object property appObj should returns false', () => {

            expect(routesInjector({
                routeObj: routes[0],
                routesArr: routes
            })).to.be.false;

        });

        it('without object property routeObj and routesArr should returns false', () => {

            expect(routesInjector({
                appObj: app
            })).to.be.false;

        });

        it('with object properties appObj, routeObj and routesArr should return true', () => {

            expect(routesInjector({
                appObj: app,
                routeObj: routes[0],
                routesArr: routes
            })).to.be.true;

        });

        it('with object property appObj which is not a function should returns false', () => {

            expect(routesInjector({
                appObj: 'abc',
                routeObj: routes[0]
            })).to.be.false;

        });

        it('with object property routeObj which is not an object should returns false', () => {

            expect(routesInjector({
                appObj: app,
                routeObj: 'abc'
            })).to.be.false;

        });

        it('with object property routesArr which is not an object should returns false', () => {

            expect(routesInjector({
                appObj: app,
                routesArr: 'abc'
            })).to.be.false;

        });
    });

});
