const Clients = require("../models/clientschema");

// exports.setnew = async (req, res) => {
//   var usrtoken = req.query.token;
//   const clients = await Clients.find({ reset_password_token: usrtoken });
//   if (clients == undefined || clients == null || clients.length == 0) {
//     console.log("no token found");
//     return res.send("couldn't find token ");
//   }
//   return res.render("set_new_pass");
// };

exports.save_new_password = async (req, res) => {
  const typed_token = req.body.token;
  const clients = await Clients.find({ reset_password_token: typed_token });
  if (clients == undefined || clients == null || clients.length == 0) {
    console.log("no token found");
    return res.send("couldn't find token ");
  }
  const new_pass = req.body.new_pass;
  const conf_pass = req.body.confirm_password;

  if (new_pass != conf_pass) 
  return res.status(400).send("conf!=pass");

  const user = clients[0];
  user.password = new_pass;
  await user.save();
  return 1;
  // search for user
  // update password field
  // save to DB

};
