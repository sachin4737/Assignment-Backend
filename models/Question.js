const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {type:String,required:true},
  options: [{type:String,required:true}],
  answer: {type:String,required:true},
});

module.exports = new mongoose.model("Questions",QuestionSchema);