const student=require('../models/student');
const identity=require('../models/identity');
const department=require('../models/department');
const addingtoidentityandstudent=async(req,res)=>{
    try{
        const studentData=await student.create(req.body.student);
        const identityData=await identity.create(
            {...req.body.identity,
            StudentId:studentData.id
            }
        );
        res.status(201).json({student:studentData,identity:identityData});
    }catch(error){
        console.error('Error adding entries to the tables:', error);
        res.status(500).json({error:'Internal Server Error'});
    }
};
const addingtodepartmentandstudent=async(req,res)=>{
    try{
        const departmentData=await department.create(req.body.department);
        const studentData=await student.create(
            {...req.body.student,
            departmentId:departmentData.id
            }
        );
        res.status(201).json({student:studentData,department:departmentData});
    }catch(error){
        console.error('Error adding entries to the tables:', error);
        res.status(500).json({error:'Internal Server Error'});
    }
}

module.exports={addingtoidentityandstudent,addingtodepartmentandstudent};