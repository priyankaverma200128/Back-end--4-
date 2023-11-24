const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    autoId:{type:Number, default:0},
    userId:{type:mongoose.Schema.Types.ObjectId,default:null,ref:'user'},
    name:{type:String,default:""},
    email:{type:String,default:""},
    contact:{type:String,default:""},
    address:{type:String,default:""},
    gender:{type:String,default:""},
    status:{type:Boolean,default:true}
})

module.exports= mongoose.model('customer',customerSchema)