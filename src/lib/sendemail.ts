/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  secure: false,
  auth: {
    user: "97131b003@smtp-brevo.com",
    pass: "57P0zFfwapSQZV2R",
  },
});

const sendEmail = async (to: any, subject: any, html: any) => {
  const mailOptions = {
    from:"contact@build360.ma",
    to,
    subject,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
