var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()


app.use(bodyParser.json());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  
    extended:true
}))

mongoose.connect('mongodb://Localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


var db = mongoose.connection;

db.on('error',()=>console.log("error in connecting to db"));
db.once('open',()=>console.log("connected to db"));

app.post("/signup",(req,res)=>{
    var name  = req.body.name;
    var email  = req.body.email;
    var phone_no  = req.body.phone_no;
    var password  = req.body.password;

    var info = {

        "name":name,
        "email":email,
        "phone_no":phone_no,
        "password":password
    }

    db.collection('newuser').insertOne(data,(err,collection)=>{
        if(err){
            throw err;

        }

        console.log("data inserted successfully...")
        

        
    
    })

    return res.redirect('signup_success.html')

})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })



    return res.redirect('index.html')


}).listen(3000);

console.log("listening on port 3000");
