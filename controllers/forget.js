const Clients = require("../models/clientschema");
var random=require("uuid");


exports.generateResettokenEmail = async (req, res) => {
    console.log("----------------");
    const email_typed  = req.body.email;
    console.log("======================");
    console.log("======================");
    console.log(email_typed);
    
    var token = "test";

    const clients = await Clients.find({Email: email_typed});
    if (clients == undefined || clients ==  null || clients.length== 0)//checks law elmail mawgood aslan fel database wala la2
     {
        console.log("Could not find user");
        return res.send("Could not find user.");
     }
     
//law user mawgood:
    const user = clients[0];
    user.reset_password_token = token;
    await user.save();
    return res.send("DONE!");
    // save t odb to email given by user
}



//www.aya7aga.com/reset_password?token=skdfhsdkhfsdkjfhlskdjfdklf
// - create router for that ^ PATH
//  - Create controller to read parameter
// - Retrieve user with given token
// - redirect user to set_new_password page where they can enter their new password
