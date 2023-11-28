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
    if(!req.file || !req.file.fieldname){
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
        material.attachment = req.file.key
        
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

const all = async (req, resp) => {

    try {
        const materials = await Material.find(req.body)

        const materialwithurl = await Promise.all(
            materials.map(async (material) => {
                const signedUrl = await helper.generatePresignedUrl(
                    process.env.CYCLIC_BUCKET_NAME,
                    material.attachment
                )
                return {
                    ...material.toObject(),
                    signedUrl
                }
            })
        )
        resp.send({
            success: true,
            status: 200,
            message: "All Materials loaded",
            data: materialwithurl,
        })
    }
    catch (err) {
        resp.send({
            success: false,
            status: 500,
            message: !!err.message ? err.message : err,
        });
    }
}

const single = async (req, resp) => {
    try {
        let formData = req.body
        let validation = ""
        if (!formData._id)
            validation += "_id is required"
        if (!!validation)
            resp.send({ success: false, status: 422, message: validation })

        let query = { _id: formData._id }
        const material = await Material.findOne(query)
        if (!!material) {
            const signedUrl = await helper.generatePresignedUrl(
                process.env.CYCLIC_BUCKET_NAME,
                material.attachment
            )
            resp.send({
                success: true,
                status: 200,
                message: "Material loaded Successfully",
                data: { ...material.toObject(), signedUrl },
            });
        } else {
            resp.send({ success: false, status: 404, message: "No Material Found" });
        }
    } catch (err) {
        resp.send({
            success: false,
            status: 500,
            message: !!err.message ? err.message : err,
        });
    }
};

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
                if(!!req.file || !!req.file.fieldname)
                    data.attachment= req.file.key

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