const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require("path")


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}));

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dataInter',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},function(err){
    if(err)
    {
        console.log(err)
    }
    else
    {
        console.log("connection successful")
    }
})

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

var Usermodel = mongoose.model('interviews',UserSchema)

app.set('view engine','ejs');


app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/signup", function (req, res) {
    res.render(__dirname+'/views/signup.ejs');
});

app.post('/signup', function(req, res){
var newuser = new Usermodel({name:req.body.name,email:req.body.email,password:req.body.password})
    newuser.save(function(err){
        if(err)
        {
            res.send("smthing went wrong");
        }
        else
        {
            res.render("login.ejs");
            // res.send("user registration successfull");
        }
    })
})

app.get("/login", function (req, res) {
    res.render(__dirname+'/views/login.ejs');
});

app.post('/login' , function(req,res)
{
    Usermodel.find({
        email:req.body.email ,
        password:req.body.password
    },function(err,documents){
        if(err)
        {
            res.send('something went wrong');
        }
        else
        {
            if(documents.length == 0)
            {
                res.send('Login failed');
            }
            else
            {
                res.render(__dirname+'/views/after_login.ejs');
                // res.send('Login successfull');
            }
        }
    })
})


app.get("/programming", function (req, res) {
    res.render(__dirname+'/views/programming.ejs');
});

app.get("/IE", function (req, res) {
    res.render(__dirname+'/views/IE/IE.ejs');
});
app.listen(3000, function(){
    console.log('Server is running on port 3000');
});