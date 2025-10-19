const expenses=require('../models/expenses')
function isnotvalid(string){
    if(string==''){
        return true
    }
    else{
        return false
    }
}
const addexpense=async (req,res)=>{
    console.log(req.body)
    try{
        const {amount,description,category}=req.body
        console.log(amount,category)
        if(isnotvalid(amount)||isnotvalid(category)){
            res.status(400).json({message:'amount and category must to fill'})
        }
        const result=await expenses.create({amount,description,category,'userId':req.user.id,membershipstatus:"false"})
        console.log('added data in db.....',result)
        res.status(201).json({message:'details added sucesfully',data:result})
    }
    catch(error){
        res.status(500).json({message:error})
    }

}
const getexpenses=async (req,res)=>{
    try{
      
        const result=await expenses.findAll({where:{userId:req.user.id},raw:true})
        console.log('getting particular user details........',result)
        res.status(200).send(result)
    }
    catch(err){
        res.status(500).json({message:'unable to fetch details'})
    }

}
const deleteexpense=async (req,res)=>{
    try{
          const id=req.params.id
        const result=await expenses.destroy({where:{id:id,userId:req.user.id}})
        if(!result){
            res.status(404).json({message:'id with expense notfound'})
        }
        res.status(200).json({message:'expense deleted successfully'})
    }
    catch(error){
        res.status(500).json({message:'unable delete expense'})
    }
}
module.exports={
    addexpense,
    getexpenses,
    deleteexpense
}