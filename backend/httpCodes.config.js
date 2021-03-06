// HTTP CODES CONFIG
module.exports = {
    SUCCESS: 200, // Default status code for all successful response of pages or resource without property 'statusCode'.
    CREATED: 201,
    UPDATED: 204,
    REDIRECT: {
        PERMANENT: 301, // Default status code for all redirect pages without property 'statusCode'.
        TEMPORARY: 302 // Default status code for all error handler redirects.
    },
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    DELETED: 410,
    INTERNAL_ERROR: 500,
    SUPPORTED_ERRORS: [ // All supported errors need to be defined in pages.config.js and have his own configuration object.
        500, // First element is default variable - Is returned in all otherwise cases of error, which hasn't defined.
        404
    ]
};
