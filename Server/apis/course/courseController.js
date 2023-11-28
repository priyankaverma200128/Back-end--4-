const Course = require("./courseModel")
const helper  = require('../../utilites/helper')


const add=async (req,res)=>{
    var validation =""
    if(req.body.courseName==""){
        validation += "name is required"
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
        let total = await Course.countDocuments()
        let course = new Course()
        course.autoId = total+1
        course.courseName = req.body.courseName
        course.attachment = req.file.key
        
        course.save()
            .then((data) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Course Added",
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

const deleteCourse = (req,res)=>{
    let validation=""
    if(req.body.courseId==""){
        validation+="id is required"
    }
    if(!!validation){
        res.send({
            success:false,
            status:409,
            message:validation
        })
    }
    else{
        Course.findOneAndDelete({_id:req.body._id}).exec()
        .then(singlecourse=>{
            if(singlecourse==null){
                res.send({
                    success:false,
                    status:404,
                    message:"data not found"
                })
            }
            else{
                Course.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.send({
                        success:true,
                        status:200,
                        message:"Record Deleted"
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
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }
}

const getAll = async (req, resp) => {

    try {
        const courses = await Course.find(req.body)

        const courseswithurl = await Promise.all(
            courses.map(async (course) => {
                const signedUrl = await helper.generatePresignedUrl(
                    process.env.CYCLIC_BUCKET_NAME,
                    course.attachment
                )
                return {
                    ...vendor.toObject(),
                    signedUrl
                }
            })
        )
        resp.send({
            success: true,
            status: 200,
            message: "All Courses loaded",
            data: courseswithurl,
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

const getSingle = (req,res)=>{

    let validation =""
    if(!req.body._id){
        validation = "id is required"
    }
    if(!!validation){
        res.send({
            success:false,
            status:500,
            message:validation
        })
    }
    else{
        Course.findOne({_id:req.body._id})
        .then((data)=>{
            if(data==null){
                res.send({
                    success:false,
                    status:500,
                    message:"project does not exist"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"single document loaded",
                    data:data
                })
            }
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }
}

const update = (req, res) => {
    console.log(req.body)
    let validation = "";
    if (!req.body._id) { // Corrected from req.body._Id to req.body._id
        validation += "id is required";
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 500,
            message: validation,
        });
    } else {
        Course.findOne({ _id: req.body._id })
            .then((data) => {
                if (data == null) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "course does not exist",
                    });
                } else {
                    // Check if fields are being updated and update them if necessary
                    if (req.body.courseId) {
                        data.courseId = req.body.courseId;
                    }
                    if (req.body.courseName) {
                        data.courseName = req.body.courseName;
                    }
                    if (req.file || req.file.fieldname) {
                        data.attachment = req.file.key;
                    }

                    // Save only if any fields were updated
                    if (req.body.courseId || req.body.courseName) {
                        data
                            .save()
                            .then((updated) => {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "data updated",
                                    data: updated,
                                });
                            })
                            .catch((err) => {
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: err.message,
                                });
                            });
                    } else {
                        res.send({
                            success: true,
                            status: 200,
                            message: "No fields updated",
                        });
                    }
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message,
                });
            });
    }
};


module.exports ={
    add,
    deleteCourse,
    getAll,
    getSingle,
    update
}