const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titlesFields={
    empID:mongoose.Schema.Types.ObjectId,
    title:String,
    from_date:Date,
    to_date:Date
}

const titlesSchema = new Schema(titlesFields);

const Title = mongoose.model('Titles',titlesSchema);

if (!Title.collection.collection){
    Title.createCollection();
}

module.exports ={Title,titlesFields};