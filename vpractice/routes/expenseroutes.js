const express=require('express')
const expensecontroller=require('../controllers/expensecontroller')
const routes=express.Router()
routes.post('/addexpense',expensecontroller.addexpense)
routes.get('/getexpenses',expensecontroller.getexpenses)
routes.delete('/deleteexpense/:id',expensecontroller.deleteexpense)
module.exports=routes