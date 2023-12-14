const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const path = require('path')

function generateAccessToken(id,name){
  return jwt.sign({userId:id,userName:name},process.env.TOKEN_SECRET,{expiresIn:'2d'})
}

exports.usersnp = async (req, res) => {
  console.log("in exports poste");
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const { name, email, password } = req.body;
    if (
      name.length === 0 ||
      name == null ||
      password == null ||
      email == null ||
      email.length === 0 ||
      password.length === 0
    ) {
      res.status(400).json({ err: "bad  parameters" });
    }
    const user = await userModel.findOne({ where: { email: email } });
    if (user) {
      res.status(403).json({ error: "user exists" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        console.log(err);
        const data = await userModel.create({ name, email, password: hash });
        res.status(201).json({ data: data });
      });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

exports.userlgn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await userModel.findOne({ where: { email } });
    if (user) {
      bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
          console.log(err);
        }
        if(result){
          console.log("logged in");
         const token = generateAccessToken(user.id,user.name)
         console.log(token)
          res.status(200).json({ message: "Logged in successfully", 'token': token});
        }        
       else {
        console.log("wrong password");
        res.status(401).json({ message: "Wrong password" });
      }
    })
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({ message: err });
  }
};

exports.expenset = async(req,res)=>{
  res.sendFile(path.join(__dirname,  '../public/expense.html'));
}