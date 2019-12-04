const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const pug = require('pug');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateTemplate = (filename, options = {}) => {
  const template = pug.renderFile(`${__dirname}/../views/emails/${filename}.pug`, options);
  const result = juice(template);

  return result;
};

exports.sendMail = async (options) => {
  const template = generateTemplate(options.filename, options);
  const text = htmlToText.fromString(template);
  const info = {
    from: 'Admin <admin@challenger.app>',
    to: options.user.email,
    subject: options.subject,
    html: template,
    text,
  };

  await transporter.sendMail(info).catch((err) => { console.log(err); });
};
