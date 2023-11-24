const mongoose = require('mongoose')

const playedquizSchema = new mongoose.Schema({
    autoid:{type:Number, default:0},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    quizid:{type:mongoose.Schema.Types.ObjectId, ref:'quiz'},
    correct:{type:Number, default:0},
    total:{type:Number, default:0},
    createdAt:{type:Date, default:Date.now},
    status:{type:Boolean, default:true}
})

module.exports = mongoose.model('playedquiz',playedquizSchema)