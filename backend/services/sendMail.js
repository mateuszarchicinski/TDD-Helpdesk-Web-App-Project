// NODE MODULES
const promise = require('bluebird');
const nodemailer = require('nodemailer');


// APP CONFIG
const APP_CONFIG = require('../app.config');


// APP SERVICES
const tokenHandler = require('../services/tokenHandler');


const sendMail = (user, config) => {
    return new promise((resolve, reject) => {
        if (typeof user !== 'object' || typeof config !== 'object' || !config.type) {
            return reject();
        }

        config.from = config.from || 'Helpdesk Application <admin@helpdesk-application.com>';
        config.to = user.email;

        if (config.type === 'verificationEmail') {
            const newToken = tokenHandler.encode({
                sub: user._id,
                email: user.email
            });

            config.subject = 'Email verification';
            config.html = `<p>Verify your email address by clicking on <a href="http://localhost:4848/verification/email?token=${newToken}">activate link</a>.</p>`;
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


module.exports = sendMail;
