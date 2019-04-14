const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const jwt = require('jsonwebtoken');

const app = express();

//Local files can be read from this folder
app.use(express.static('public'));

//using body-parsers to read post API data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 
app.set("view engine", "pug");

//Setting up server
const server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// Initialize Firebase
var config = require("./config.json")
var credentials = require("./credentials.json")

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref('capstone-f942f')

app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.post('/login', (req,res) => {
    
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    if(email != credentials.username){
        res.send("e-mail id invalid");
        return;
    }
    else if(password!=credentials.password){
        res.send("Incorrect Password");
        return;
    }
    else{
        res.send("OK");
        return;
    }
    // this thing will ensure protection of routes which require login from user
    // jwt.sign({user: result[0]}, 'hashkey', (err, token) => {
    //     res.json({
    //         token
    //     });
    // })    
});


//variables to be used in all functions and files
var sendData = {};
var foodData = [];
var waiterData = [];

//token verification needs to be added
//app.get("/home", verifyToken, (req, res, next) => {
app.get("/home", (req, res, next) => {
    sendData = {};
    foodData = [];
    waiterData = [];
    ref = database.ref('TableNo101')
    //This data contains both- food and waiter data
    ref.on('value', (data)=> {
        //data for food orders
        var orderId = [];
        for(item in data.val().Order){
            orderId.push(item);
        }
        for(var i=0;i<orderId.length;i++){
            // console.log(data.val().Order[orderId[i]])
            var items = []
            var tmp = {
                    "id" : orderId[i],
                    // "status" : "Pending",
                    "status" : data.val().Order[orderId[i]].status,
                    "table" : "101",
                    "info" : data.val().Order[orderId[i]].special_instruction
            }

            for(var j=0;j<data.val().Order[orderId[i]].food_items.length;j++){
                items.push({
                    "name": data.val().Order[orderId[i]].food_items[j],
                    "quantity": data.val().Order[orderId[i]].quantity[j]
                });
                tmp["items"] = items;
            }
            foodData.push(tmp);
        }
        sendData["data"] = foodData;

        //data for waiterwork
        var waiterId = [];
        for(item in data.val().waiterWork){
            waiterId.push(item);
        }
        for(var i=0;i<waiterId.length;i++){
            if(data.val().waiterWork[waiterId[i]].waiter == 'required'){
                waiterData.push({
                    "id" : waiterId[i],
                    "waiter" : "required",
                    "table" : "101",
                    "purpose" : data.val().waiterWork[waiterId[i]].purpose
                });
            }
        }
        sendData["waiterWork"] = waiterData;
        console.log("sendData: ",sendData);
    }, (err)=>{
        console.log(err)
    })
    next()
    }, (req, res)=>{
        res.render(__dirname + "/index", sendData);
});


//triggered when order is prepared
app.post('/prepared/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    ref = database.ref('TableNo101/Order/'+orderId);
    ref.update({status:"Prepared"});
    res.sendStatus(200);
});

app.post('/sendWaiter/:requestId', (req,res) =>{
    let requestId = req.params.requestId;
    ref = database.ref('/TableNo101/waiterWork/'+requestId);
    ref.update({waiter:"catered"});
    res.sendStatus(200);
});

//Verify token
function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined'){    
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //set token in req header
        req.token = bearerToken;
        next();
    }
    
    else{
        res.sendStatus(403);
    }
}