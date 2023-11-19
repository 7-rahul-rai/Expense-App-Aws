const expenseModel = require("../models/expense");

exports.expense = async(req,res)=>{
    const {amount,description,category} = req.body
    try{
       const data = await expenseModel.create({amount,description,category})
       res.status(201).json({data:data})
    }
    catch(err){
        res.status(500).json({msg:'something went wrong'})
        console.log(err);
    }
}

exports.getexpense = async(req,res)=>{
    try{
        const data = await expenseModel.findAll();
        const jsonData = data.map(expense => expense.toJSON());
        res.json(jsonData);        
    }
    catch(err){
        res.status(500).json({msg:"error"});
    }
}

exports.delex = async(req,res)=>{
    const id=req.params.id;
    try{
        await expenseModel.destroy({where:{id}});
        console.log('data deleted');
        res.status(200).json({msg:'data has deleted'})
    }
    catch(err){
        res.status(403).json({msg:"not deleted"})
    }
}

