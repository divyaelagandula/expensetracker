const users=require('../models/users')
function isnotvalid(string){
    if(string==undefined||string.length==0){
        return true
    }
}
const signup=async (req,res)=>{
    try{
        const {name,email,password}=req.body
       
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
const login=async (req,res)=>{
    try{
        console.log(req.body)
        const {email,password}=req.body
        if(isnotvalid(email)||isnotvalid(password)){
            return res.status(400).json({Error:'missing input filed'})
        }
        const listOfUsers=await users.findAll({raw:true})
        console.log(listOfUsers)
        const userEmailChecking=listOfUsers.find(user=>user.email==email)
        const userPasswordChecking=listOfUsers.find(user=>user.password==password)
        console.log('user email',userEmailChecking)
        console.log('user paswoord',userPasswordChecking)
        if(userEmailChecking && userPasswordChecking){
            return res.status(200).json({succeses:true,message:'user logged successfully'})
        }
        if(!userEmailChecking){
             return res.status(404).json({succeses:false,message:'user not found'})
        }
        if(!userPasswordChecking){
             return res.status(400).json({succeses:false,message:'password invalid'})
        }

        



    }
    catch(error){
        console.log(error)
        res.status(500).send('error while login')
    }

}
module.exports={
    signup,
    login
}