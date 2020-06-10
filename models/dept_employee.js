const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptEmployeeFields ={
    empID:mongoose.Schema.Types.ObjectId,
    deptID:mongoose.Schema.Types.ObjectId,
    from_date:Date,
    to_date:Date
}

const deptEmployeeSchema = new Schema(deptEmployeeFields);

const DeptEmployee = mongoose.model('deptEmployees',deptEmployeeSchema);

if (!DeptEmployee.collection.collection){
    DeptEmployee.createCollection();
}

module.exports ={DeptEmployee,deptEmployeeFields};