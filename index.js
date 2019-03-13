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
//var ref = database.ref('test');

// ref.push(sampledata)

// ref.on('value', (data) => {
//     console.log(data.val());
// }, (err) => {
//     console.log(err);
// });

const testdata = require('./sampletest.json')

// const testData = setInterval(() => {
//     let ref = database.ref('test')
//     ref.on('value', (data)=> {
//         return data.val();
//     }, (err)=>{
//         console.log(err)
//     })
// }, 10000);

// console.log(testData);

//Home page- rendering using sample data as of now
// app.get("/", (req, res) => {
//     // console.log(testData)
//     res.render(__dirname + "/index", testdata);
// });

app.get("/", (req, res, next) => {
    let ref = database.ref('test')
    ref.on('value', (data)=> {
        testData = data.val();
        console.log(testData);
    }, (err)=>{
        console.log(err)
    })
    next()
    }, (req, res)=>{
        console.log()
        res.render(__dirname + "/index", testdata);
});


//triggered on confirmation of order
app.get('/confirm/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    let ref = database.ref('test/'+orderId)
    ref.on('value', (data) => {
        //let orderId = req.params.orderId;
        console.log(orderId);
        console.log(data.val());
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});

//triggered when order is prepared
app.get('/prepared/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    ref = database.ref('test/orderId')
    ref.on('value', (data) => {
        //Add the suitable query here
        console.log(orderId);
    }, (err) => {
        console.log(err);
        res.sendStatus(500);
    })
});