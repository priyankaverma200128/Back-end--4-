const User = require("../apis/user/userModel")
const bcrypt = require('bcrypt')

User.findOne({"email":"admin@gmail.com"})
.then((data)=>{
    if(data==null){
        let admin = new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:bcrypt.hashSync("123456",10),
            userType:1
        })
        admin.save()
        .then(()=>{
            console.log("admin created")
        })  

    }
    else{
        console.log("Admin already Exists");
    }
})
.catch((err)=>{
    console.log("Error in finding admin",err);
})