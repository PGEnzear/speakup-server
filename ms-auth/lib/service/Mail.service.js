const nodemailer = require('nodemailer');

const config = {
    SMTP_HOST: "smtp.yandex.ru",
    SMTP_PORT: 465,
    SMTP_USER: "SpeakUpSocial@yandex.ru",
    SMTP_PASSWORD: "mqzetaiytsgxtbug",
    API_URL: process.env.API_URL
}

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.SMTP_HOST,
            port: config.SMTP_PORT,
            secure: true,
            auth: {
                user: config.SMTP_USER,
                pass: config.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: config.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + config.API_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();