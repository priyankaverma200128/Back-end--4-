const Playedquiz = require("./playedquizModel")

const add= async (req,res)=>{
    let validation=""
    if(!req.body.userid){
        validation+="userid is required"
    }
    if(!req.body.quizid){
        validation+="quizid is required"
    }
    if(!req.body.correct){
        validation+="correct is required"
    }
    if(!req.body.total){
        validation+="total is required"
    }
    if(!!validation){
        res.send({success:false,status:500,Message:validation})
    }
    else{
        let total =await Playedquiz.countDocuments()
        let playedquiz = new Playedquiz()
        playedquiz.autoid=total+1
        playedquiz.userid=req.body.userid
        playedquiz.quizid=req.body.quizid
        playedquiz.correct=req.body.correct
        playedquiz.total=req.body.total
        playedquiz.save()
        .then((data)=>{
            res.send({success:true,status:200,Message:"New playedquiz added",data:data})
        })
        .catch((err)=>{
            console.log(err)
            res.send({success:false,status:500,Message:err.Message})
        })
    }
}



const all =(req,res)=>{
    Playedquiz.find(req.body)
    .populate('quizid')
    .populate("userid")
    .then((data)=>{
        res.send({success:true,status:200,message:"All playedquiz loaded",data:data,total:data.length})
    })
    .catch((err)=>{
        res.send({success:false,status:500,message:err.message})
    })
}

const single =(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Playedquiz.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"playedquiz does not found"})
            }
            else{
                res.send({success:true,status:200,message:"single documnet loaded",data:data})
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }
}







module.exports={add,all,single}