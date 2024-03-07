const express = require('express');
const router = express.Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

router.post('/sendmail',  (req, res)=>{
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD
        }
     });
     const body = JSON.parse(req.body);
    const mailOptions = {
        from: body.from, // Sender address
        to: body.to, // List of recipients
        subject: body.subject, // Subject line
        text: body.message, // Plain text body
   };
   transport.sendMail(mailOptions, function(err, info) {
       if (err) {
        res.status(500).send(err.message)
       } else {
         res.status(200).send({message:"Sent Email Successfully!", "msg":info.response})
       }
   });
});

module.exports = router;