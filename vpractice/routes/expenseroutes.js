const express=require('express')
const expensecontroller=require('../controllers/expensecontroller')
const userAuthentication=require('../middileware/autherntication')
const routes=express.Router()
routes.post('/addexpense',userAuthentication.authentication,expensecontroller.addexpense)
routes.get('/getexpenses',userAuthentication.authentication,expensecontroller.getexpenses)
routes.delete('/deleteexpense/:id',userAuthentication.authentication,expensecontroller.deleteexpense)
module.exports=routes