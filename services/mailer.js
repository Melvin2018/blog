import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail'
import {
    newToken
} from './token.js'

const sendHTMLEmail = (toEmail, subject, html) => {
    sgMail.setApiKey(process.env.SG_API_KEY)
    const options = {
        from: "Melvin Blog <ro0211032016@unab.edu.sv>",
        to: toEmail,
        subject: subject,
        html: html
    }
    const gmail = false;
    let response;
    if (gmail) {
        const optionsGmail = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_GMAIL,
                pass: process.env.PASS_GMAIL,
            }
        }
        const transporter = nodemailer.createTransport(optionsGmail)
        response = transporter.sendMail(options)
    } else {
        response = sgMail.send(options)
    }
    response.then(res => {
            console.log("Email enviado");
        })
        .catch(err => {
            console.log(err.response.body)
        })
}
export const sendVerificationEmail = (user) => {
        const token = newToken(user.id);
        const link = `http://localhost:8080/auth/verify/?token=${token}`
        sendHTMLEmail(user.email, "Email Verification", `
            Muchas gracias por registrarte</br>
            verifica tu email <a href=${link}>aqui</a>
        `);
    }
    // sendVerificationEmail({
    //     id: 3,
    //     email: 'mapacherecinos@gmail.com'
    // })