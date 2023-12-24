const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.authenticate = (req,res,next)=>{
    try{
        const token = req.header('Authorization');
        console.log(req.headers);
        console.log(token);
        const user = jwt.verify(token ,process.env.TOKEN_SECRET );
        console.log(user);
        const userid = user.id;
        console.log('user', userid);
        User.findByPk(userid).then(
            user=>{
                req.user=user;
                next();
            }
        ).catch(err=> { throw new Error(err)})
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false})
    }
}

exports.checkpremium =( req,res,next)=>{
    const ispremiumuser = req.user.ispremiumuser ;
    if(!ispremiumuser){
        return res.status(400).json({message : 'Buy Premium'});
    }else{
        next();
    }

}