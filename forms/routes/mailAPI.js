var nodemailer = require('nodemailer');


function myMail(userDetails)
{

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tesu.mail.demo@gmail.com',
        pass: 'tesu9981148976'
      }
    });
    
    var mailOptions = {
      from: 'tesu.mail.demo@gmail.com',
      to: userDetails.email,
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });  
}

module.exports=myMail
