module.exports = {
    'env': {
        'es6': true,
        'mocha': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'helpers': true,
        'chai': true,
        'expect': true,
        'sinon': true,
        'nodeMocksHttp': true
    },
    'parserOptions': {
        'sourceType': 'module',
        'ecmaFeatures': {
            'impliedStrict': true
        }
    },
    'rules': {
        'indent': [
            2,
            4
        ],
        'linebreak-style': [
            2,
            'windows'
        ],
        'quotes': [
            2,
            'single'
        ],
        'semi': [
            2,
            'always'
        ],
        'no-var': 2
    }
};
