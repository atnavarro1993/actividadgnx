const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salariesFields={
    empID:mongoose.Schema.Types.ObjectId,
    salary:Number,
    from_date:Date,
    to_date:Date
}

const salariesSchema = new Schema(salariesFields);

const Salary = mongoose.model('Salaries',salariesSchema);

if (!Salary.collection.collection){
    Salary.createCollection();
}

module.exports ={Salary,salariesFields};