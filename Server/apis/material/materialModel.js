const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    autoId:{type:Number, default:0},
    courseid:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'course'},
    branchid:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'branch'},
    materialtypeid:{type:mongoose.Schema.Types.ObjectId, default:null, ref:'materialtype'},
    title:{type:String, default:''},
    description:{type:String, default:''},
    attachment:{type:String,default:''},
    createdAt:{type:Date, default:Date.now},
    status:{type:Boolean, default:true
    }
})

module.exports = mongoose.model('material',materialSchema)