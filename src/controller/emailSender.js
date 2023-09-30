require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const tokenSecret = process.env.JWT_SECRET;
const tokenHeaderKey = process.env.HEADER_KEY;
const userModel = require("../model/user");

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
function getVerificationMessage(otp) {
  return `<h4 style="color:blue;text-align:center;">Please copy or type the OTP provided below: <br><br>${otp}`;
}

function getRecoveryMessage(existence) {
  return (
    `<h4 style="color:blue;text-align:center;">Please click the link to reset your password: </h4><br><br>${process.env.BASE_URL}/auth/recovery/` +
    `${CryptoJS.AES.encrypt(
      JSON.stringify({ id: existence.id, email: existence.email }),
      tokenSecret
    ).toString()}`
  );
}

const setSubject = (actType) =>
  actType == "recovery"
    ? "Auth-Full: Recover Your Password"
    : actType == "verification"
    ? "Auth-Full: Verify Your Email"
    : "";

const getMailOptions = ({ to, subject, html }) => {
  return {
    from: process.env.SENDER,
    to,
    subject: subject(),
    html: html(),
  };
};

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SENDER,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });
}
const sendOtpMail = ({ user, res }) => {
  //
  const OTP = generateOTP();
  //
  const mailOptions = getMailOptions({
    to: user.email,
    subject: () => setSubject("verification"),
    html: () => getVerificationMessage(OTP),
  });
  //
  const transporter = getTransporter();
  //
  transporter
    .sendMail(mailOptions)
    .then((result) => {
      console.log(`Message Sent: ${result.messageId}`);
      //  otp+expires = crypto token => send the token as response with message
      res.status(201).send(JSON.stringify(result));
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};

async function sendResetMail({ user, res }) {
  const mailOptions = getMailOptions({
    to: user.email,
    subject: () => setSubject("recovery"),
    html: () => getRecoveryMessage(user),
  });
  //
  const transporter = getTransporter();
  //
  transporter
    .sendMail(mailOptions)
    .then((result) => {
      console.log(`reset link sent: : ${result.messageId}`);
      res ? res.send(JSON.stringify(result)) : null;
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
}

module.exports = {
  sendResetMail,
  sendOtpMail,
};
