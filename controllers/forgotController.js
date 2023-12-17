const { v4: uuidv4 } = require('uuid');

const User = require('../models/user'); 
const bcrypt =  require('bcrypt');

const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance
const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY
const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email : 'rk03wap@gmail.com'
}


exports.forgotp = async(req,res)=>{
    const {email} = req.body;
    const receiver = {
        email : email
    }
    try{
    await tranEmailApi.sendTransacEmail({
        sender , 
        to : receiver , 
        subject : 'link reset password' , 
        textContent : `This to inform you` 
    })
                                                       
    res.status(200).json({msg : 'email sent reset password'});
}
catch(err){
    console.log("error in sending mail", err);
    res.json(err)
}
    
}

