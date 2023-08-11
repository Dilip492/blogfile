const nodemailer = require('nodemailer')
require('dotenv').config();

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
      
    }
})


let mailOptions = {
    from:"linajej509@anwarb.com",
    to: "dpal991193@gmail.com",
    subject: 'Your OTP is here Please did not share',
    text: 'OTP is here 9718827'
  };

  transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });