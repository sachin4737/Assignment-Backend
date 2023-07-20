const express = require("express");
const connectDB = require("./database")
const cors = require("cors")
const User = require('./models/Register')
const Question = require("./models/Question")
const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(cors());


app.post("/api/check-user",(req,res)=>{
    const {email} = req.body;
    User.findOne({email:email}).then(user=>{
        if(user){
            res.send({isRegister:true})
        }else{
            res.send({isRegister:false})
        }
    }) 
})

app.post("/api/register",(req,res)=>{
    const {name,email,password} = req.body;
    User.findOne({email:email}).then(user=>{
        if(user){
            res.send({message:"User already register"})
        }else{
            const user = new User({
                name,
                email,
                password
            })
            user.save().then((err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"User register succesfully"})
                }
            })
        }
    }) 
})

app.post("/api/login",(req,res)=>{
    const{email,password} = req.body;
    User.findOne({email:email}).then(user=>{
        if(user){
          if(password === user.password){
            res.send({message:"Login succesfull",user:user})
          } else{
            res.send({message:"Password did not match"})
          } 
        }else{
            res.send({message:"User is not register"})
        }
  })
})

app.post("/api/add-question",(req,res)=>{
    const{question,options,answer} = req.body;
    Question.findOne({question,answer}).then(que=>{
        if(que){
            res.send({message:"Already Exist",success:false})
        }else{
            const ques = new Question({
                question,
                options,
                answer
            })
            ques.save().then((err)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"Question added succesfully"})
                }
            })
        }
    })

})

app.get("/api/get-questions",(req,res)=>{
       Question.find().then(questions=>{
        const quest = questions.slice(0,10)
        res.send({data:quest,success:true})
       })
})

app.listen(4000,()=>{console.log("server listen on port 4000")})