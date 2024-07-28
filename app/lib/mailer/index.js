import nodemailer from 'nodemailer';

export async function sendEmail(emailConfig) {
    const { to, subject, html, attchments } = emailConfig

    if (process.env.ENABLE_EMAIL_NOTIFICATION === "true") {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.APPLICATION_NOTIFIER_MAIL,
                pass: process.env.APPLICATION_NOTIFIER_MAIL_PASSCODE,
            },
        });

        return await transporter.sendMail({
            from: process.env.APPLICATION_NOTIFIER_MAIL,
            to: to,
            subject: subject,
            html: html,
            attchments
        }).catch((err) => {
            console.log("error triggering email", err)
            // ignore error for now
            return Promise.resolve()
        })
    } else {
        return Promise.resolve()
    }
}
