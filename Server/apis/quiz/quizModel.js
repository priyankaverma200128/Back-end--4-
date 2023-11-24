const mongoose = require('mongoose')

const quizSchema = new mongoose.Schema({
    autoId:{type:String, default:''},
    courseid:{type:mongoose.Schema.Types.ObjectId, ref:'course'},
    branchid:{type:mongoose.Schema.Types.ObjectId, ref:'branch'},
    title:{type:String,default:''},
    numberofQuestion:{type:String,default:''},
    createdAt:{type:Date, default:Date.now},
    status:{type:Boolean, default:true
    }
})

module.exports = mongoose.model('quiz',quizSchema)