const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD, BASE_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: `${BASE_EMAIL}`,
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: `${BASE_EMAIL}`,
  };

  try {
    const info = await transporter.sendMail(email);
    console.log("Email sent: " + info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email: " + error.message);
    return false;
  }
};

module.exports = sendEmail;
