'use strict';


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let routeModel;


describe('Models: route.js', () => {

    describe('Tests with required mongoose connection:', () => {
        let route;

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

        before((done) => {
            routeModel = mongoose.models.Route ? mongoose.model('Route') : mongoose.model('Route', require('../../models/route').schema);

            route = new routeModel(helpers.ROUTE_MODEL.EXAMPLE_DATA);

            /* eslint-disable */
            route.save((err, route) => {
                if (err) {
                    console.log(err.message);
                    /* eslint-enable */
                }

                done();
            });
        });

        after((done) => {
            routeModel.collection.drop().then(() => {
                done();
            });
        });

        after((done) => {
            mongoose.connection.close().then(() => {
                done();
            });
        });

        it('method find should return an array with one object', (done) => {

            routeModel.find(helpers.ROUTE_MODEL.EXAMPLE_DATA, (err, results) => {
                if (results.length !== 1) {
                    throw Error('Something went wrong!');
                }

                done();
            });

        });

        it('method save on object with the same property url should return an error', (done) => {
            const route = new routeModel(helpers.ROUTE_MODEL.EXAMPLE_DATA);

            /* eslint-disable */
            route.save((err, route) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('route model constructor without required object property url should return an error', (done) => {
            /* eslint-disable */
            routeModel.create({}, (err, route) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('new route object created only with required object property url should return correct object', () => {
            const routeEqual = {
                url: route.url,
                method: route.method,
                controller: route.controller
            };

            expect(routeEqual).to.deep.equal(helpers.ROUTE_MODEL.EQUAL_ROUTE);
        });
    });

    describe('Tests without required mongoose connection:', () => {
        let route;

        beforeEach(() => {
            route = new routeModel(helpers.ROUTE_MODEL.RANDOM_EQUAL_ROUTE);
        });

        it('is a function', () => {

            expect(routeModel).to.be.a('function');

        });

        it('new route object created with all random object properties should return correct object', () => {
            const routeEqual = {
                url: route.url,
                method: route.method,
                middlewares: route.middlewares,
                controller: route.controller
            };

            expect(routeEqual).to.deep.equal(helpers.ROUTE_MODEL.RANDOM_EQUAL_ROUTE);
        });

        it('method getMiddlewares should return an array with exported modules function', () => {
            expect(route.getMiddlewares()).to.be.an('array');

            route.getMiddlewares().forEach((elem) => {
                expect(elem).to.be.a('function');
            });
        });

        it('method getController should return exported module function', () => {
            expect(route.getController()).to.be.a('function');
        });
    });

});
