import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail'
import {
    newAuthToken
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
    //Hice los dos metodos de envio, por gmail y por sendGrid, depende el valor de la variable gmail asi sera el metodo
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
        transporter.sendMail(options)
    } else {
        sgMail.send(options);
    }
}
export const sendVerificationEmail = (user) => {
    const {
        auth
    } = newAuthToken(user.id);
    const link = `http://localhost:8080/auth/verify/${auth}`
    sendHTMLEmail(user.email, "Email Verification", `
            Muchas gracias por registrarte</br>
            verifica tu email <a href=${link}>aqui</a>
        `);
}
export const sendConfirmationEmail = (user) => {
    console.log(user);
    sendHTMLEmail(user.email, "Email confirmation", `<h1>Bienvenido a Melvin Blog</h1>`);
}