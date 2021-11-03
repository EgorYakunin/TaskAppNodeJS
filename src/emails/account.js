const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'e.yakunin04@gmail.com',
        subject: 'Welcome to the task app',
        text: `<h1>${name}, thank you for joining task app</h1>`,
        html: `<h1>${name}, thank you for joining task app</h1>`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'e.yakunin04@gmail.com',
        subject: `Goodbye, ${name}`,
        text: 'Your account was succesfully deleted. What cound we do to keep you on board ?',
        html: 'Your account was succesfully deleted. What cound we do to keep you on board ?'
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}