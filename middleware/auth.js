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
        const userid = user.userId;
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