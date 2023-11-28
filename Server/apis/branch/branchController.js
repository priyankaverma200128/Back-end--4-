const Branch = require("./branchModel")

const add=async(req,res)=>{
    var validation =""
    if(req.body.name==""){
        validation += " name is required"
    }
    if(!req.file || !req.file.fieldname){
        validation += "attachment is required"
    }
    if(req.body.courseId==""){
        validation += " courseId is required"
    }
   if(!!validation){
        res.send({
            success: false,
            status: 403,
            message: validation
        })
    }
    else{
        let total = await Branch.countDocuments()
        let branch = new Branch()
        branch.autoId=total+1
        branch.courseId=req.body.courseId
        branch.name=req.body.name
        branch.attachment = req.file.key
        branch.save()
        .then((data)=>{
            res.send({success: true,
                status: 200,
                message: "New branch Added",
                data: data})
        })
        .catch((err)=>{
            res.send({success: false,
                status: 500,
                message: err.message})
        })

    }
    
}

const getAll= (req,res)=>{
    Branch.find(req.body)
    .populate('courseId')
    .then((data)=>{
        res.send({
            success:true,
            status:200,
            message:"All Batches are Loaded",
            data:data,
            total:data.length
        })
    })
    .catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
}

const getSingle = (req,res)=>{
    let validation =""
    if(!req.body._id){
        validation="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Branch.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"Project does not exist"})
            }
            else{
                res.send({success:true,status:200,message:"Single document loaded",data:data})
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }

}

const update = (req,res)=>{
    console.log(req.body);
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        Branch.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"Branch does not exist"})
            }
            else{
                if(!!req.body.courseId)
                    data.courseId=req.body.courseId
                if(!!req.body.name)
                    data.name=req.body.name
                if(!!req.file || !!req.file.fieldname)
                    data.attachment= req.file.key
                
                    data.save()
                    .then((updated)=>{
                        res.send({
                            success:true,
                            status:200,
                            message:"data updated",
                            data:updated
                        })
                    })
                    .catch((err)=>{
                        res.send({ success:false,
                            status:500,
                            message:err.message})
                       
                    })
                
                
            }
        })
        .catch((err)=>{
            res.send({ success:false,
                status:500,
                message:err.message})

        })
    }
}

const deleteBranch = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Branch.findOneAndDelete({_id:req.body._id}).exec()
        .then((singlebranch)=>{
            if(singlebranch==null){
                res.send({success:false,status:500,message:"data not found"})
            }
            else{
                Branch.deleteOne({_id:req.body._id})
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
          
module.exports ={add,getAll,getSingle,update,deleteBranch}