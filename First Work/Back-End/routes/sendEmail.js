const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: "sadsad@gmail.com",
                pass: "asdasdsad@dasdsad"
            }
        })

        await transporter.sendMail({
            from: "sdasdadsa@dasdsad.com",
            to: email,
            subject: subject,
            text: text
        })

        console.log("Email sent successfully")
    } catch (error) {
        console.log(error, "error")
    }
}