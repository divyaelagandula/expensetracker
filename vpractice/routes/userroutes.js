const express=require('express')
const usercontroller=require('../controllers/usercontroller')
const routes=express.Router()
routes.post('/signup',usercontroller.addUserInformation)
module.exports=routes