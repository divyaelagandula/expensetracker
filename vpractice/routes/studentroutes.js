const express=require('express');
const router=express.Router();
const studentcontroller=require('../controllers/studentcontroller');
router.post('/addingtoidentityandstudent',studentcontroller.addingtoidentityandstudent);
router.post('/addingtodepartmentandstudent',studentcontroller.addingtodepartmentandstudent);
module.exports=router;