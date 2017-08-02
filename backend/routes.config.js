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
        DEFAULT_CONTROLLER: 'main'
    },
    DIRECTORY: {
        MIDDLEWARES_DIR: '/middlewares', // Middlewares files directory
        CONTROLLERS_DIR: '/controllers' // Controllers files directory
    }
};
