const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    autoId:{type:Number, default:0},
    courseName:{type:String, default:''},
    createdAt:{type:Date, default:Date.now},
    attachment:{type:String,default:''},
    status:{type:Boolean, default:true
    }
})

module.exports = mongoose.model('course',courseSchema)