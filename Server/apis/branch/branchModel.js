const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    autoId:{type:Number, default:0},
    name:{type:String, default:''},
    courseId:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'course',required: true},
    createdAt:{type:Date, default:Date.now},
    attachment:{type:String,default:''},
    status:{type:Boolean, default:true
    }
})

module.exports = mongoose.model('branch',branchSchema)