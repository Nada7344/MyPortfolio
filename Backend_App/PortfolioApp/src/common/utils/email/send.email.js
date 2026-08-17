import nodemailer from 'nodemailer';
import { emailTemplate } from './template.email.js';
import { EMAIL, EMAIL_APP_PASSWORD } from '../../../../config/config.service.js';

export const sendEmail = async ({
  to,
  cc,
  bcc,
  name,
  email,
  reason,
  message,
  attachments = [],
} = {}) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  try {

    const info = await transporter.sendMail({
      from: EMAIL,

      to,
      cc,
      bcc,

      replyTo: email,

      subject: `New Portfolio Message — ${reason}`,

      html: emailTemplate({
        name,
        email,
        reason,
        message,
      }),

      attachments,
    });

    console.log("Message sent: %s", info.messageId);

    return info;

  } catch (err) {
    console.error("Error while sending mail:", err);
    throw err;
  }
};