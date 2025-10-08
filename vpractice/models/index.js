const student=require('./student');
const identity=require('./identity');
const department=require('./department');
student.hasOne(identity);
identity.belongsTo(student);
//one to many relationship
department.hasMany(student);
student.belongsTo(department);

module.exports={student,identity,department};
