const nodemailer = require("nodemailer");

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const message = {
        from: "studentCouncil@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transport.sendMail(message)
};

module.exports = sendEmail;

