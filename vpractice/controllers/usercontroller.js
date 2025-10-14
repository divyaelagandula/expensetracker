const users=require('../models/users')
function isnotvalid(string){
    if(string==undefined||string.length==0){
        return true
    }
}
const addUserInformation=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        console.log('name',name)
        if(isnotvalid(name)||isnotvalid(email)||isnotvalid(password)){
            return res.status(400).json({Error:'missing input filed'})
        }
        const result=await users.create(req.body)
        res.status(201).json({message:'details added to database'})
    }
    catch(error){
        console.log(error.name)
        if(error.name=='SequelizeUniqueConstraintError'){
            return res.status(409).json({Error:'email alredy exists'})
        }
        res.status(500).json({Error:'error adding details into db'})
    }
    



}
module.exports={
    addUserInformation
}