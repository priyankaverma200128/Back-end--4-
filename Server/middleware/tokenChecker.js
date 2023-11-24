const jwt = require('jsonwebtoken')
const SECRET = '^Y%%%khkvh,67695723456yghbn$%^&hgdffvjkl@'
const check = (req,res,next)=>{
    let token = req.headers['authorization']

    if(!!token){
        jwt.verify(token,SECRET, (err)=>{
            if(err){
                res.send({success:false,status:403,message:"Unauthorized Access"})
            }
            else{
                next()
            }
        })
    }
    else{
        res.send({success:false,status:403,message:"Token Not Found"})
    }
}
module.exports = check