const express = require('express')
const app = express()
const port = 5000
app.use(express.urlencoded({extended:false}))
const db = require('./Server/config/db')
const seed = require('./Server/config/seed')
const cors = require('cors')

app.use(express.static('server/public/'))

app.use(cors())


app.get('/',(req,res)=>{
    res.send("Welcome To Server")
})



const adminRoutes = require('./Server/routes/adminRoutes')
const customerRoutes = require('./Server/routes/customerRoutes')
app.use("/admin",adminRoutes)
app.use("/customer",customerRoutes)






app.listen(port, (error)=>{
    if(error){
        console.log("Error While Server Starting",error);
    }
    else{
        console.log("Server Is Running");
    }
})
