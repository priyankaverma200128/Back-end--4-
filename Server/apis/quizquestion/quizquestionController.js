const Quizquestion = require('./quizquestionModel')

const add = (req,res)=>{
    let validation=""
    if(!req.body.questiontitle){
        validation+="questitle is required"
    }
    if(!req.body.option1){
        validation+="option1 is required"
    }
    if(!req.body.option2){
        validation+="option2 is required"
    }
    if(!req.body.option3){
        validation+="option3 is required"
    }
    if(!req.body.option4){
        validation+="option4 is required"
    }
    if(!req.body.answer){
        validation+="answer is required"
    }
    if(!req.body.quizid){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        let total=Quizquestion.countDocuments()
        let quizquestion=new Quizquestion()
        quizquestion.autoId=total+1
        quizquestion.questiontitle=req.body.questiontitle
        quizquestion.option1=req.body.option1
        quizquestion.option2=req.body.option2
        quizquestion.option3=req.body.option3
        quizquestion.option4=req.body.option4
        quizquestion.answer=req.body.answer
        quizquestion.quizid=req.body.quizid
        quizquestion.total=req.body.total

        quizquestion.save()
        .then((data)=>{
            res.send({success:true,status:200,message:"new quizquestion added",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }
}

const all =(req,res)=>{
    Quizquestion.find(req.body)
    .populate('quizid')
    .then((data)=>{
        res.send({success:true,status:200,message:"All quizquestion loaded",data:data,total:data.length})
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
        Quizquestion.findOne({_id:req.body._id})
        .populate('quizid')
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"quizquestion does not found"})
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

const update = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({
            success:false,status:500,message:validation
        })
    }
    else{
        Quizquestion.findOne({_id:req.body._id})
        .populate('quizid')
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"quizquestion does not exist"})
            }
            else{
                if(!!req.body.questiontitle)
                    data.questiontitle=req.body.questiontitle
                if(!!req.body.option1)
                    data.option1=req.body.option1
                if(!!req.body.option2)
                    data.option2=req.body.option2
                    if(!!req.body.option3)
                    data.option3=req.body.option3
                    if(!!req.body.option4)
                    data.option4=req.body.option4
                if(!!req.body.answer)
                    data.answer=req.body.answer

                    data.save()
                    .then((updated)=>{
                        res.send({success:true,status:200,message:"data updated",data:updated})
                    })
                    .catch((err)=>{
                        res.send({success:false,status:500,message:err.message})
                    })
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }
}

const deleteQuizquestion = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Quizquestion.findByIdAndDelete({_id:req.body._id}).exec()
        .then((singlequizquestion)=>{
            if(singlequizquestion==null){
                res.send({success:false,status:500,message:"data not found"})

            }
            else{
                Quizquestion.deleteOne({_id:req.body._id})
                .then((data)=>{
                    res.send({success:true,status:200,message:"record deleted",data:data})
                })
                .catch((err)=>{
                    res.send({success:false,status:500,message:err.message})
                })
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }

}


module.exports={add,all,single,update,deleteQuizquestion}