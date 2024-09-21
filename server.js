
const express =require('express')
const mongoose= require('mongoose')
const path= require('path')
const port =3000


const app= express();
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/students')
const db = mongoose.connection
db.once('open',()=>{
    console.log("Mongodb Connnection successful")
})
 
//schema
const userSchema = new mongoose.Schema ({
    name:String,
    address:String
})

const Users =  mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post', async(req, res)=>{
    const{name,address} = req.body
    const user = new Users({
    name,
    address
})
await user.save()
console.log(user)
res.send("Form Submission Successful")
})

app.listen(port,()=>{
    console.log("Server started")
})
