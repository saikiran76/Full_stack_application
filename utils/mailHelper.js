import config from '../config/transporter.config.js'
import config from '../config/index.js'

const mailHelper = async(options)=>{
    const message = {
        from: config.SMTP_MAIL_NAME, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.subject, // plain text body
        // html: "<b>Hello world?</b>", // html body
    }

    await transporter.sendMail(message)

}

export default mailHelper;