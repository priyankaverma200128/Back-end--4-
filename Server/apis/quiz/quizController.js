const Quiz = require("./quizModel")

const add=(req,res)=>{
    let validation=""
    if(!req.body.courseId){
        validation+="courseId is required"
    }
    if(!req.body.branchId){
        validation+="branchId is required"
    }
    if(!req.body.title){
        validation+="title is required"
    }
    // if(!req.body.numberofQuestion){
    //     validation+="numberofQuestion is required"
    // }
    if(!!validation){
        res.send({success:false,status:500,Message:validation})
    }
    else{
        let total = Quiz.countDocuments()
        let quiz = new Quiz()
        quiz.autoId=total+1
        quiz.courseid=req.body.courseId
        quiz.branchid=req.body.branchId
        quiz.title=req.body.title
        quiz.numberofQuestion=req.body.numberofQuestion

        quiz.save()
        .then((data)=>{
            res.send({success:true,status:200,Message:"New quiz added",data:data})
        })
        .catch((err)=>{
            res.send({success:false,status:500,Message:err.Message})
        })
    }
}

const all=(req,res)=>{
    Quiz.find(req.body)
    .then((data)=>{
        res.send({success:true,status:200,Message:"all Quizs are loaded",data:data,total:data.length})
    })
    .catch((err)=>{
        res.send({success:false,status:500,Message:err.Message})
    })
}

const single = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,Message:validation})
    }
    else{
        Quiz.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,Message:"Quiz does not found"})
            }
            else{
                res.send({success:true,status:200,Message:"single document loaded",data:data})
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,Message:err,Message})
        })
    }
}

const update =(req,res)=>{
    let validation =""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,Message:validation})
    }
    else{
        Quiz.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,Message:"Quiz does not exist"})
            }
            else{
                if(!!req.body.courseId)
                    data.courseid=req.body.courseId
                if(!!req.body.branchId)
                    data.branchid=req.body.branchId
                if(!!req.body.title)
                    data.title=req.body.title
                if(!!req.body.numberofQuestion)
                    data.numberofQuestion=req.body.numberofQuestion

                        data.save()
                        .then((updated)=>{
                            res.send({success:true,status:200,Message:"data updated",data:updated})
                        })
                        .catch((err)=>{
                            res.send({success:false,status:500,Message:err.Message})
                        })
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,Message:err.Message})
        })
    }

}

const deleteQuiz = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Quiz.findOneAndDelete({_id:req.body._id}).exec()
        .then((singlequiz)=>{
            if(singlequiz==null){
                res.send({success:false,status:500,message:"data not found"})
            }
            else{
                Quiz.deleteOne({_id:req.body._id})
                .then((data)=>{
                    res.send({success:true,status:200,message:"Record Deleted"})

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

module. exports ={add,all,single,update,deleteQuiz}