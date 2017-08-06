// NODE MODULES
const promise = require('bluebird');
const nodemailer = require('nodemailer');


// APP CONFIG
const APP_CONFIG = require('../app.config');


// APP SERVICES
const tokenHandler = require('../services/token-handler');


module.exports = function (config, user) {
    return new promise((resolve, reject) => {
        if (typeof config !== 'object' || !config.type) {
            return reject(false);
        }

        config.from = config.from || `[Restful API] <${APP_CONFIG.SMTP.USER || 'admin@mateusz-archicinski.pl'}>`;

        if (config.type === 'verification_email') {
            if (!user) {
                return reject({
                    message: 'Pass the second param which is a user object to send correctly an email for user account verification!'
                });
            }

            config.to = user.email || config.to;

            const newToken = tokenHandler.encode({
                sub: user._id,
                email: user.email
            });

            config.subject = 'Email verification';
            config.html = `<p>Verify your email address by clicking on <a href="${config.redirectUri}/verification/email?token=${newToken}">activate link</a>.</p>`;
        }

        const transporter = nodemailer.createTransport({
            host: APP_CONFIG.SMTP.HOST,
            port: APP_CONFIG.SMTP.PORT,
            secure: true,
            auth: {
                user: APP_CONFIG.SMTP.USER,
                pass: APP_CONFIG.SMTP.PASSWORD
            }
        });

        transporter.sendMail(config, (err, info) => {
            if (err) {
                return reject(err);
            }

            resolve(info);
        });
    });
};
