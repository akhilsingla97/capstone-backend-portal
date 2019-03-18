const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const path = require('path');

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

firebase.initializeApp(config);

var database = firebase.database();
var ref = database.ref('capstone-f942f')

const testdata = require('./sampletest.json')

//Home page- rendering using sample data as of now
// app.get("/", (req, res) => {
//     // console.log(testData)
//     res.render(__dirname + "/index", testdata);
// });

var sendData = {};
var testData = [];

app.get("/", (req, res, next) => {
    sendData = {};
    testData = [];
    ref = database.ref('TableNo101')
    ref.on('value', (data)=> {
        console.log(data.val());
        // var testData = []
        var orderId = []
        for(item in data.val().Order){
            orderId.push(item);
        }
        for(var i=0;i<orderId.length;i++){
            // console.log(data.val().Order[orderId[i]])
            var items = []
            var tmp = {
                    "id" : orderId[i],
                    "status" : "Pending",
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
            testData.push(tmp);
        }
        sendData["data"] = testData;
        // console.log(orderId);
        console.log(sendData);
    }, (err)=>{
        console.log(err)
    })
    next()
    }, (req, res)=>{
        // console.log()
        res.render(__dirname + "/index", sendData);
});


//triggered on confirmation of order
app.post('/confirm/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    let ref = database.ref('test/'+orderId)
    ref.on('value', (data) => {
        //let orderId = req.params.orderId;
        console.log(orderId);
        console.log(data.val());
        res.sendStatus(200);
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

//triggered when order is prepared
app.post('/prepared/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    ref = database.ref('test/orderId')
    ref.on('value', (data) => {
        //Add the suitable query here
        console.log(orderId);
        res.sendStatus(200);
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});