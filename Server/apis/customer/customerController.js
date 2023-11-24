const User = require('../user/userModel')
const Customer = require('./customerModel')
const bcrypt = require('bcrypt')

const addCustomer = async(req,res)=>{
    let validation =""
    if(!req.body.name){
        validation +="Name is required"
    }
    if(!req.body.email){
        validation +="Email is required"
    }
    if(!req.body.password){
        validation += "password is Required"
    }
    if(!req.body.contact){
        validation +="Contact is required"
    }
    if(!req.body.address){
        validation +="Address is required"
    }
    if(!req.body.gender){
        validation +="Gender is required"
    }

    if(!!validation){
        res.send({success:false,status:500,message:validation})
    }
    else{
        let prev = await User.findOne({email:req.body.email})
        if(prev != null){
            res.send({success:false,status:500,message:"Email Already Exists"})
        }
        else{
            let user = new User()
            user.name= req.body.name
            user.email= req.body.email
            user.password=bcrypt.hashSync(req.body.password, 10)    


            user.save()
            .then(async(data)=>{
                let total = await Customer.countDocuments()
                let customer = new Customer()
                customer.autoId = total+1
                customer.userId = data._id
                customer.name = req.body.name
                customer.email = req.body.email
                customer.contact = req.body.contact
                customer.address = req.body.address
                customer.gender = req.body.gender
                

                customer.save()
                .then((customerData)=>{
                    res.send({success:true,status:200,message:"Customer Registered",data:customerData})
                })
                .catch((err)=>{
                    res.send({success:false,status:500,message:err.message})
                })
            })
            .catch((err)=>{
                res.send({success:false,status:500,message:err.message})
            })

        }
    }
}
module.exports ={addCustomer}