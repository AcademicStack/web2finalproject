function isValidEmailAddress(email){
  var regExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regExp.test(email);
}

function containsURL(str){
  var regExp = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/i;
  return regExp.test(str);
}

function isValidContactFormSubmit(firstName, lastName, email, comments){
  if(firstName && lastName && email && comments){
    if(containsURL(firstName) || containsURL(lastName) || containsURL(comments)){
      return false;
    }
    if(!isValidEmailAddress(email)){
      return false;
    }
    return true;
  }
  return false;
}

function sendEmailNotification(message, callback){

  const nodemailer = require('nodemailer');

  const DOMAIN = "codexacademia.westernstudent.com";
  const EMAIL_SERVER = "mail." + DOMAIN;
  const EMAIL_ADDRESS = "_mainaccount@" + DOMAIN;
  const EMAIL_PASSWORD = "NV#u!#V^IxAb";

  let transporter = nodemailer.createTransport({
    host: EMAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_ADDRESS,
      pass: EMAIL_PASSWORD,
    },
  });

  const email = {
    from: EMAIL_ADDRESS,
    to: EMAIL_ADDRESS,
    subject: 'Contact Submit From Your Website',
    text: message
  };

  transporter.sendMail(email, callback);
}

exports.isValidContactFormSubmit = isValidContactFormSubmit;
exports.sendEmailNotification = sendEmailNotification;