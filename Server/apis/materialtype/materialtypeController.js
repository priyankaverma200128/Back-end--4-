const Materialtype = require("./materialtypeModel")

const add = async(req,res)=>{
    let validation=""
    if(req.body.materialtypeName==""){
        validation +="name is required"
    }
    if(!!validation){
        res.send({
            success: false,
            status: 403,
            message: validation
        })
    }
    else{
        let total= await Materialtype.countDocuments()
        let materialtype= new Materialtype()
        materialtype.autoId=total+1
        materialtype.materialtypeName=req.body.materialtypeName
        
        materialtype.save()

        .then((data)=>{
            res.send({
                success: true,
                status: 200,
                message:"New Materialtype Added",
                data:data
            })
        })
        .catch((err)=>{
            res.send({
                success: false,
                status: 500,
                message:err.message})

        })

    }
}

const all = (req,res)=>{
    Materialtype.find(req.body)
    .then((data)=>{
        res.send({success:true,status:200,message:"All Materialtypes are loaded",data:data,total:data.length})
    })
    .catch((err)=>{
        res,send({success:false,status:500,message:err.message})
    })
}

const single = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Materialtype.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"materialtype does not found"})
            }
            else{
                res.send({success:true,status:200,message:"single document loaded",data:data})
            }
        })
        .catch((err)=>{
            res.send
        ({success:false,status:500,message:err.message})
    })
}
}

const update = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Materialtype.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({success:false,status:500,message:"materialtype does not found"})
            }
            else{
                if(!!req.body.materialtypeName)
                    data.materialtypeName=req.body.materialtypeName

                    data.save()
                    .then((updated)=>{
                        res.send({success:true,status:200,message:"Data Updated",data:data})
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

const deleteMaterialtype = (req,res)=>{
    let validation=""
    if(!req.body._id){
        validation+="id is required"
    }
    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        Materialtype.findByIdAndDelete({_id:req.body._id}).exec()
        .then((singlematerial)=>{
            if(singlematerial==null){
                res.send({success:false,status:500,message:"data not found"})
            }
            else{
                Materialtype.deleteOne({_id:req.body._id})
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


module.exports={add,all,single,update,deleteMaterialtype}