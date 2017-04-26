// ROUTES CONFIG
module.exports = {
    MODEL: {
        METHODS: [
            'get',
            'post',
            'put',
            'delete'
        ],
        DEFAULT_METHOD: 'get',
        DEFAULT_CONTROLLER: 'mainController'
    },
    DIRECTORY: {
        MIDDLEWARES_DIR: '/middlewares', // Middlewares files directory
        CONTROLLERS_DIR: '/controllers' // Controllers files directory
    }
};
