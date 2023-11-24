const mongoose = require('mongoose')

const materialtypeSchema = new mongoose.Schema({
    autoId:{type:Number, default:0},
    materialtypeName:{type:String, default:''},
    createdAt:{type:Date, default:Date.now},
    status:{type:Boolean, default:true
    }
})

module.exports = mongoose.model('materialtype',materialtypeSchema)