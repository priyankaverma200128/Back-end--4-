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
                    ...course.toObject(),
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

 const getSingle = async (req, resp) => {
    try {
        let formData = req.body
        let validation = ""
        if (!formData._id)
            validation += "_id is required"
        if (!!validation)
            resp.send({ success: false, status: 422, message: validation })

        let query = { _id: formData._id }
        const course = await Course.findOne(query)
        if (!!course) {
            const signedUrl = await helper.generatePresignedUrl(
                process.env.CYCLIC_BUCKET_NAME,
                course.attachment
            )
            resp.send({
                success: true,
                status: 200,
                message: "Service loaded Successfully",
                data: { ...course.toObject(), signedUrl },
            });
        } else {
            resp.send({ success: false, status: 404, message: "No Course Found" });
        }
    } catch (err) {
        resp.send({
            success: false,
            status: 500,
            message: !!err.message ? err.message : err,
        });
    }
};


const update = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData._id)
        validation += "_id is required"
    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let query = { _id: formData._id }
        await Course.findOne(query).then(async res => {
            if (!!res) {
                if (!!formData.courseName)
                    res.courseName = formData.courseName
                if (!!req.file || !!req.file.fieldname){
                    helper.unlinkImage(res.image)
                    res.attachment = req.file.key
                }
                let id = res._id
                let prevCourse = await Course.findOne({ $and: [{ courseName: res.courseName }, { _id: { $ne: id } }] })
                if (prevCourse)
                    resp.send({ success: false, status: 409, message: "Course already exists with same name" })
                else
                    res.save().then(res => {
                        resp.send({ success: true, status: 200, message: "Course updated Successfully", data: res })

                    }).catch(err => {
                        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
                    })
            }
            else
                resp.send({ success: false, status: 404, message: "No Course Found" })
        }).catch(err => {
            resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
        })
    }


}



module.exports ={
    add,
    deleteCourse,
    getAll,
    getSingle,
    update
}