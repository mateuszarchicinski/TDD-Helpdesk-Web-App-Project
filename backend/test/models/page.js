'use strict';


// APP SERVICES
const mongoose = require('../../services/mongoose');


// APP MODELS
let pageModel;


describe('Models: page.js', () => {

    describe('Tests with required mongoose connection:', () => {
        let page;

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

        beforeEach((done) => {
            pageModel = mongoose.models.Page ? mongoose.model('Page') : mongoose.model('Page', require('../../models/page').schema);

            page = new pageModel(helpers.PAGE_MODEL.EXAMPLE_DATA);

            /* eslint-disable */
            page.save((err, page) => {
                if (err) {
                    console.log(err.message);
                    /* eslint-enable */
                }

                done();
            });
        });

        afterEach((done) => {
            pageModel.collection.drop().then(() => {
                done();
            });
        });

        after((done) => {
            mongoose.connection.close().then(() => {
                done();
            });
        });

        it('method find should return an array with one object', (done) => {
            pageModel.find(helpers.PAGE_MODEL.EXAMPLE_DATA, (err, results) => {
                if (results.length !== 1) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('method save on object with the same property name should return an error', (done) => {
            const page = new pageModel({
                name: 'test',
                url: '/test1',
                fileName: 'test1'
            });

            /* eslint-disable */
            page.save((err, page) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('method save on object with the same property url should return an error', (done) => {
            const page = new pageModel({
                name: 'test1',
                url: '/test',
                fileName: 'test1'
            });

            /* eslint-disable */
            page.save((err, page) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('page model constructor without required object properties name, url or fileName should return an error', (done) => {
            pageModel.create({
                url: '/test',
                fileName: 'test'
                /* eslint-disable */
            }, (err, page) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }
            });

            pageModel.create({
                name: 'test',
                fileName: 'test'
                /* eslint-disable */
            }, (err, page) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }
            });

            pageModel.create({
                name: 'test',
                url: '/test'
                /* eslint-disable */
            }, (err, page) => {
                /* eslint-enable */
                if (!err) {
                    throw Error('Something went wrong!');
                }

                done();
            });
        });

        it('new page object created only with required object properties name, url and fileName should return correct object', () => {
            const pageEqual = {
                name: page.name,
                url: page.url,
                statusCode: page.statusCode,
                fileName: page.fileName,
                type: page.type,
                redirect: {
                    statusCode: page.redirect.statusCode,
                    type: page.redirect.type,
                    name: page.redirect.name,
                    url: page.redirect.url
                },
                root: page.root
            };

            expect(pageEqual).to.deep.equal(helpers.PAGE_MODEL.EQUAL_PAGE);
        });
    });

    describe('Tests without required mongoose connection:', () => {
        let page;

        beforeEach(() => {
            page = new pageModel(helpers.PAGE_MODEL.RANDOM_EQUAL_PAGE);
        });

        it('is a function', (done) => {
            expect(pageModel).to.be.a('function');

            done();
        });

        it('new page object created with all random object properties should return correct object', () => {
            const pageEqual = {
                name: page.name,
                url: page.url,
                statusCode: page.statusCode,
                fileName: page.fileName,
                type: page.type,
                redirect: {
                    statusCode: page.redirect.statusCode,
                    type: page.redirect.type,
                    name: page.redirect.name,
                    url: page.redirect.url
                },
                root: page.root
            };

            expect(pageEqual).to.deep.equal(helpers.PAGE_MODEL.RANDOM_EQUAL_PAGE);
        });

        it('method fullUrl should return full url with language param: /pl/test', () => {
            expect(page.fullUrl('pl')).to.equal('/pl/404');
        });

        it('method fullFileName should return full file name with language suffix (-pl) and extension (.html): test-pl.html', () => {
            expect(page.fullFileName('pl')).to.equal('404-pl.html');
        });
    });

});
