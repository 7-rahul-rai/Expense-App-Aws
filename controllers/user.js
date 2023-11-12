const userModel = require('../models/user')

exports.usersnp = async(req,res)=>{
    console.log('in exports poste')
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const data = await userModel.create({
        name,
        email,
        password
    })
    res.json(data)
}