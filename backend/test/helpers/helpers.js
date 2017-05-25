/*!
 *
 * Herlpers - Here put all your needed global variables & mocks for unit testing
 *
 */


// NODE MODULES
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');


const helpers = {
    HOST: 'localhost', // Test server will be on address: http://localhost:5858
    PORT: 5848,
    MONGO_DB: { // MongoDB Config - mongodb://USER:PASSWORD@HOST:PORT/NAME
        USER: '',
        PASSDOWRD: '',
        HOST: 'localhost',
        PORT: 27017,
        NAME: 'smogly-data-visualizer-test',
        OPTIONS: {
            config: {
                autoIndex: true
            }
        }
    },
    MODES_ARRAY: [ // Array with all available modes - Used in test/routes/routes.js
        'normal',
        'angular',
        'api'
    ],
    PAGE_MODEL: { // Used in test/models/page.js
        EXAMPLE_DATA: {
            name: 'test',
            url: '/test',
            fileName: 'test'
        },
        EQUAL_PAGE: {
            name: 'test',
            url: '/test',
            statusCode: 200,
            fileName: 'test',
            type: 'normal',
            redirect: {
                statusCode: 301,
                type: 'name',
                name: 'main page',
                url: '/home'
            },
            root: '/assets/pages'
        },
        RANDOM_EQUAL_PAGE: {
            name: '404 page',
            url: '/404',
            statusCode: 404,
            fileName: '404',
            type: '404',
            redirect: {
                statusCode: 404,
                type: 'url',
                name: '404 page',
                url: '/404'
            },
            root: '/assets'
        }
    },
    ROUTE_MODEL: { // Used in test/models/route.js
        EXAMPLE_DATA: {
            url: '/test'
        },
        EQUAL_ROUTE: {
            url: '/test',
            method: 'get',
            controller: 'mainController'
        },
        RANDOM_EQUAL_ROUTE: {
            url: '/login',
            method: 'post',
            middlewares: 'default,default',
            controller: 'loginController'
        }
    },
    USER_MODEL: { // Used in test/models/user.js
        EXAMPLE_DATA: {
            firstName: 'Mateusz',
            email: 'ma@ma.pl',
            password: 'aaaaaaaa',
            active: false,
            active_tokens: [
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwiaWF0IjoxNDk0ODU1OTgxLCJleHAiOjE0OTU0NjA3ODF9.3n7ognYsQRw0n9UirTB8DCpXAzHNYWyutPz92gskVT0'
            ]
        },
        MOCK: () => { // Used in test/controllers/registerController.js && test/controllers/loginController.js
            const mock = {
                _id: '591b3b379efa9b282cb763bd',
                firstName: 'Aa',
                email: 'a@a',
                password: 'aaaaaaaa',
                active: false,
                active_tokens: [],
                token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwiaWF0IjoxNDk0ODU1OTgxLCJleHAiOjE0OTU0NjA3ODF9.3n7ognYsQRw0n9UirTB8DCpXAzHNYWyutPz92gskVT0',
                errCompare: null,
                errSave: null
            };

            mock.toJSON = () => {
                const user = mock;

                delete user.active_tokens;
                delete user.token;
                delete user.errCompare;
                delete user.errSave;
                delete user.toJSON;
                delete user.comparePasswords;
                delete user.isActiveToken;
                delete user.removeToken;
                delete user.save;

                return user;
            };

            mock.comparePasswords = (password, callback) => {
                const err = mock.errCompare;
                const status = mock.password === password;

                return callback(err, status);
            };

            mock.isActiveToken = (token) => {
                return mock.active_tokens.includes(token);
            };

            mock.removeToken = (token) => {
                const array = mock.active_tokens;
                const index = array.indexOf(token);

                if (index !== -1) {
                    array.splice(index, 1);
                }
            };

            mock.save = (callback) => {
                const err = mock.errSave;
                const user = mock;

                return callback(err, user);
            };

            return mock;
        }
    },
    TOKEN_HANDLER: {
        MOCK: (reqMock) => {
            const mock = {
                encoded: reqMock.headers.authorization.split(' ')[1],
                payload: {
                    sub: '591b3b379efa9b282cb763bd',
                    email: 'a@a',
                    device: reqMock.headers['user-agent']
                },
                v: null
            };

            mock.isValid = () => {
                return mock.v;
            };

            return mock;
        }
    },
    ERRORS: {
        MOCK: () => {
            const mock = {
                normal: {
                    message: 'Something like error message!'
                },
                unauthorized: {
                    message: 'You are not authorized!'
                },
                expires: {
                    message: 'Your token has expired.'
                },
                validation: {
                    message: 'User validation failed',
                    name: 'ValidationError'
                },
                usernotfound: {
                    message: 'User not found.'
                }
            };

            return mock;
        }
    }
};


// GLOBALS
// HELPERS & CHAI & MOCHA & SINON
global.helpers = helpers;
global.chai = chai;
global.expect = chai.expect;
global.sinon = sinon;
chai.use(sinonChai);


module.exports = helpers;
