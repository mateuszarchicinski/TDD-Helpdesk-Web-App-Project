// NODE MODULES
const jwt = require('jwt-simple');
const moment = require('moment');


// APP CONFIG
const APP_CONFIG = require('../app.config');


const tokenEncode = (object) => {
    object = object || {};

    const payload = {
        iat: moment().unix(),
        exp: moment().add(APP_CONFIG.AUTH.APP_TOKEN.EXPIRES, 'days').unix()
    };

    Object.keys(object).forEach((key) => {
        const value = object[key];

        payload[key] = value;
    });

    return jwt.encode(payload, APP_CONFIG.AUTH.APP_TOKEN.SECRET);
};


const tokenDecode = (token) => {
    const payload = jwt.decode(token, APP_CONFIG.AUTH.APP_TOKEN.SECRET);

    const isValid = () => {
        return payload.exp > moment().unix();
    };

    return {
        payload: payload,
        isValid: isValid
    };
};


module.exports = {
    encode: tokenEncode,
    decode: tokenDecode
};
