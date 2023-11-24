const Material = require("./materialModel")

const add=async (req,res)=>{
    let validation =""
    if(req.body.courseid==""){
        validation += "courseid is required"
    }
    if(req.body.branchid==""){
        validation += "branchid is required"
    }
    if(req.body.materialtypeid==""){
        validation += "materialtypeid is required"
    }
    if(req.body.title==""){
        validation += "title is required"
    }
    if(req.body.description==""){
        validation += "description is required"
    }
    if(req.body.attachment==""){
        validation+= "attachment is required"
    }

    
    if (!!validation){
        res.send({
            success: false,
            status: 403,
            message: validation
        })
    }
    else{
        let total = await Material.countDocuments()
        let material = new Material()
        material.autoId = total+1
        material.courseid = req.body.courseid
        material.branchid = req.body.branchid
        material.materialtypeid = req.body.materialtypeid
        material.title = req.body.title
        material.description = req.body.description
        material.attachment = req.body.attachment
        
        material.save()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New material Added",
                    data: data
                })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
        })
    }
}

const all=(req,res)=>{
    Material.find(req.body)
    .populate("courseid")
    .populate("branchid")
    .populate("materialtypeid")
    .then((data)=>{
        res.send({success:true,status:200,message:"all material are loaded",data:data})
    })
    .catch((err)=>{
        res.send({success:false,status:500,message:err.message})
    })
}

const single=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Material.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"data not found"})
            }
            else{
                res.send({success:true,status:200,message:"single documents loaded",data:data})
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }
}

const update =(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Material.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"Material does not exist"})
            }
            else{
                if(!!req.body.courseid)
                    data.courseid=req.body.courseid
                if(!!req.body.branchid)
                    data.branchid=req.body.branchid
                if(!!req.body.materialtypeid)
                    data.materialtypeid=req.body.materialtypeid
                if(!!req.body.title)
                    data.title=req.body.title
                if(!!req.body.description)
                    data.description=req.body.description
                if(!!req.body.attachment)
                    data.attachment= req.body.attachment

                    data.save()
                    .then((updated)=>{
                        res.send({success:true,status:200,message:"record updated",data:updated})
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

const deleteMaterial=(req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Material.findByIdAndDelete({_id:req.body._id}).exec()
        .then((singleMaterial)=>{
            if(singleMaterial==null){
                res.send({success:false,status:500,message:"data not found"})
            }
            else{
                Material.deleteOne({_id:req.body._id})
                .then((data)=>{
                    res.send({success:true,status:200,message:"Recored Deleted"})
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
module.exports ={add,all,single,update,deleteMaterial}