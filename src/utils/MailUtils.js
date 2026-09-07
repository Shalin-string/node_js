const mailer = require("nodemailer")
require("dotenv").config()

const mailSend = async(to,subject,html)=>{

    const transport = mailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    })
    const mailOptions = {
        from:process.env.EMAIL,
        to:to,
        subject:subject,
        html:html,
        attachments: [
        {
            filename: "gitimg.png",
            path: "./images/gitimg.png"
        }
    ]
    }
    const mailresponse = await transport.sendMail(mailOptions)
    console.log(mailresponse)

}

module.exports = mailSend