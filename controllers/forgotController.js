
exports.forgotp = async(req,res)=>{
    const {email} = req.body;
    res.status(201).json({'msg':'forgotpage'})
}

