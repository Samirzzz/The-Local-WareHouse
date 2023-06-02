const Clients = require("../models/clientschema");
//var random=require("uuid");
const nodemailer = require('nodemailer');


function randomNum() {
  const random = Math.floor(Math.random() * 9000 + 1000);
  console.log(random);
  return random;
}
 
function send_Email(email, token)
{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'novacore3300@gmail.com',
          pass: 'lbzwzswenfdotpap'
        }
      });
      
      const mailOptions = {
        from: 'novacore3300@gmail.com',
        to: email,
        subject: 'password reset',
        text: 'Your password reset token is :'+token
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
}


exports.generateResettokenEmail = async (req, res) => {
  const email_typed = req.body.email;
  console.log(email_typed);
  var token = randomNum();

  const clients = await Clients.find({ Email: email_typed });
  if (clients == undefined || clients == null || clients.length == 0) 
  {
    //checks law elmail mawgood aslan fel database wala la2
    console.log("Could not find user");
    return res.send("Could not find user.");
  }
 
  send_Email(email_typed,token);
  //law user mawgood:
  const user = clients[0];
  user.reset_password_token = token;
  await user.save();
  return console.log("email sent");
  // save t odb to email given by user
};

// www.aya7aga.com/reset_password?token=skdfhsdkhfsdkjfhlskdjfdklf
// - create router for that ^ PATH
//  - Create controller to read parameter
// - Retrieve user with given token
// - redirect user to set_new_password page where they can enter their new password
