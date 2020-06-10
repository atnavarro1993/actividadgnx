const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deptManagerFields ={
    empID:mongoose.Schema.Types.ObjectId,
    deptID:mongoose.Schema.Types.ObjectId,
    from_date:Date,
    to_date:Date
}

const deptManagerSchema = new Schema(deptManagerFields);

const DeptManager = mongoose.model('deptManagers',deptManagerSchema);

if (!DeptManager.collection.collection){
    DeptManager.createCollection();
}

module.exports ={DeptManager,deptManagerFields};