const Clients = require("../models/clientschema");


exports.setnew = async (req, res) =>
 {
    var usrtoken= req.query.token;
    const clients = await Clients.find({reset_password_token: usrtoken});
    if(clients == undefined || clients == null || clients.length == 0 )
    {
    console.log("no token found" );
    return res.send("couldn't find token ");
    }
    return res.render("set_new_pass");
  
}

exports.save_new_password = async (req, res) =>
 {
    console.log("1 tmm")
    const new_pass=req.query.new_pass;
    console.log("2 tmm")
    const user=clients[0];
    console.log("3 tmm")
    user.password=new_pass;
    console.log("4 tmm")

    await user.save();
    return res.send("password saved sucessfully");
    // search for user
    // update password field
    // save to DB
}

