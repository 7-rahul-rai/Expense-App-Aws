const expenseModel = require("../models/expense");
const User = require('../models/user')


exports.expense = async(req,res)=>{
    const {amount,description,category} = req.body
    try{
       const data = await expenseModel.create({amount,description,category,userId:req.user.id})
       res.status(201).json({data:data})
    }
    catch(err){
        res.status(500).json({msg:'something went wrong'})
        console.log(err);
    }
}

exports.getexpense = async(req,res)=>{
    try{
        const data = await expenseModel.findAll({where:{userId:req.user.id}});
        const jsonData = data.map(expense => expense.toJSON());
        res.json(jsonData);        
    }
    catch(err){
        res.status(500).json({msg:"error"});
    }
}

exports.delex = async(req,res)=>{
    const userId=req.user.id;
    const id = req.params.id
    try{
      const data = await expenseModel.destroy({where:{userId,id}});
      if (data > 0) {
        console.log('Data deleted');
        res.status(200).json({ msg: 'Data has been deleted' });
    } else {
        console.log('No data deleted');
        res.status(404).json({ msg: 'No matching data found to delete' });
    }
  }
    catch(err){
        res.status(403).json({msg:"not deleted"})
    }
  } 

