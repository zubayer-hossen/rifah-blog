const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, subject, text }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Rifah's Website" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,
    subject: subject ? `[Website] ${subject}` : `[Website] New message from ${name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2>New contact message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${text.replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
};

module.exports = sendEmail;
