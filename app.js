const express=require("express");
const bodyParser=require("body-parser");
const reqest=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstname=req.body.fName;
    var lastname=req.body.lName;
    var email=req.body.email;
    var data={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };
    var jsonData=JSON.stringify(data);
    var options={
        url: "https://us7.api.mailchimp.com/3.0/lists/2fe1fff5d7",
        method: "POST",
        headers:{
            'Authorization' : 'auth 5e5ec9ef711b783cdf41fcbb82146c05-us7'
        },
        body: jsonData
    };
    reqest(options,function(error,response,body){
        
        if(error){
            res.sendFile(__dirname+"/failure.html");
        }
        else{
            if(response.statusCode==200){
                res.sendFile(__dirname+"/success.html");
            }
            else{
                res.sendFile(__dirname+"/failure.html");
            }
        }
    });
});

app.post("/failure",function(req,res){
    res.redirect('/');
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server started on port 3000");
});
// 2fe1fff5d7
//5e5ec9ef711b783cdf41fcbb82146c05-us7