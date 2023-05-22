// const Clients = require("../models/clientschema");


// exports.setnew = async (req, res) => {
//     console.log("----------------");
//     console.log("======================");
//     console.log("======================");
//     var usrtoken= req.query.token;
//     const clients = await Clients.find({reset_password_token: usrtoken});
//     if(clients == undefined || clients == null || clients.length == 0 )
//     {
//     console.log("no token found" );
//     return res.send("couldn't find token ");
//     }
//     return res.render("set_new_pass");
  
// }

// exports.save_new_password = async (req, res) => {
//     // search for user
//     // update password field
//     // save to DB
// }

