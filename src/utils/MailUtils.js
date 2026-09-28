const mailer = require("nodemailer")
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const mailSend = async(to,subject,html)=>{
    console.log("email---",process.env.EMAIL)
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
    //     attachments: [
    //     {
    //         filename: "gitimg.png",
    //         path: "./images/gitimg.png"
    //     }
    // ]
    }
    try{
    const mailresponse = await transport.sendMail(mailOptions)
    console.log(mailresponse)
    }
    catch(err){
    console.log("MAIL ERROR:", err);
}
}

module.exports = mailSend