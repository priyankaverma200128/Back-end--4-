const mongoose = require('mongoose')

const quizquestionSchema = new mongoose.Schema({
    autoId:{type:String, default:''},
    questiontitle:{type:String, default:''},
    option1:{type:String, default:''},
    option2:{type:String, default:''},
    option3:{type:String, default:''},
    option4:{type:String, default:''},
    answer:{type:String, default:''},
    quizid:{type:mongoose.Schema.Types.ObjectId, ref:'quiz'},
    createdAt:{type:Date, default:Date.now},
    status:{type:Boolean, default:true}
})

module.exports = mongoose.model('quizquestion',quizquestionSchema)