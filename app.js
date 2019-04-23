//jshint esversion:6

const express= require("express"); // download express everytime
const bodyParser = require('body-parser');// download body parser everytime


const app=express(); // need this everytime to use app keyowrd
const request= require("request");// need to install this everytime


app.use(express.static("public")); // app .us static will let us refer to html
// have to use this to corporate it
app.use(bodyParser.urlencoded({extended:true}));// need this everytime


app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName= req.body.firstName;
  var lastName= req.body.lastName;
  var email=req.body.email;

  var data = {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME:lastName
        }
      }
    ]
  };
  var jsonData =JSON.stringify(data);

  var options={ // asssuming this is format they wnat ?
    url:"https://us20.api.mailchimp.com/3.0/lists/a443e30dca",
    method: "POST",
    headers:{ // node js basic Authorization code
      "Authorization":"Hao 52222cc179b5dd14aec0946b00f6c5d7-us20"
    },
      body: jsonData, // body is basically the name format for chimp and json DATA stores all the "DATA"
  };

request(options,function(error,response,body){
if(error){
//res.sendFile(__dirname+"/failure.html");
}
else{


if(response.statusCode===200){
  //res.sendFile(__dirname+"/success.html");
  console.log("success")
}
else{
//  res.sendFile(__dirname+"/failure.html");
}

}


});
});


//52222cc179b5dd14aec0946b00f6c5d7-us20

//a443e30dca

// post route for the failure button that reroutes to the root page
app.post("/failure",function(req,res){
  res.redirect("/");
});










app.listen(process.env.PORT || 3000,function(){
  console.log("listening on port 3000");
});
