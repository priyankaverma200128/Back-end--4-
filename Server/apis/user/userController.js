const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = '^Y%%%khkvh,67695723456yghbn$%^&hgdffvjkl@'
const login = (req,res)=>{
    let validation=""
    if(!req.body.email){
        validation+="email is required"
    }
    if(!req.body.password){
        validation+="password is requirede"
    }
    if(!!validation){
        res.send({success:false, status:500, message:validation})
    }
    else{
        User.findOne({email:req.body.email})
        .then((data)=>{
            if(data==null){
                res.send({success:false, status:500, message:"user does not exist"})
            }
            else{
                if(bcrypt.compareSync(req.body.password, data.password)){
                    
                    if(data.status){
                        let payload ={
                            _id:data._id,
                            name:data.name,
                            email:data.email,
                            userType:data.userType

                        }
                        let token = jwt.sign(payload,SECRET)
                        res.send({success:true,status:200,message:"login successful",data:data, token:token})
                    }
                    else{
                        res.send({success:false,status:500,message:"Account Inactive"})
                    }
                }
                else{
                    res.send({success:false,status:500,message:"Invalid Credential"})
                }
            }
        })
        .catch((err)=>{
            res.send({success:false,status:500,message:err.message})
        })
    }
}

exports.addUser = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.password)
        validation += "password is required,"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let total = await User.countDocuments()
        let UserData = {
            userId: total + 1,
            name: formData.name,
            email: formData.email,
            password: bcrypt.hashSync(formData.password, salt),
            userType: 2
        }
        let user = new User(UserData)
        let prevUser = await User.findOne({ email: formData.email })
        if (prevUser)
            resp.send({ success: false, status: 409, message: "User already exists with same email" })
        else
            user.save().then(res => {
                resp.send({ success: true, status: 200, message: "User added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }

}

module.exports={login}