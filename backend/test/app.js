'use strict';


// NODE MODULES
const request = require('request');


// APP MODULES
const app = require('../app.source');


// LOCAL VARIABLES
const baseUrl = `http://${helpers.HOST}:${helpers.PORT}`;


describe('Application responses:', () => {

    describe('GET: /', () => {
        let createServer;

        before(() => {
            createServer = app.appSource(helpers.PORT, helpers.HOST);
        });

        after(() => {
            createServer.close();
        });

        it('should returns status code: 200', (done) => {
            setTimeout(() => {
                /* eslint-disable */
                request.get(baseUrl, (error, response, body) => {
                    /* eslint-enable */
                    if (error) {
                        throw error;
                    }

                    expect(response.statusCode).to.equal(200);

                    done();
                });
            }, 5000);
        });

        it('should returns header with a value of property content-type: text/html; charset=utf-8', (done) => {
            setTimeout(() => {
                /* eslint-disable */
                request.get(baseUrl, (error, response, body) => {
                    /* eslint-enable */
                    if (error) {
                        throw error;
                    }

                    expect(response.headers['content-type']).to.equal('text/html; charset=utf-8');

                    done();
                });
            }, 5000);
        });
    });

});
