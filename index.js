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

//Setting up server
const server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

// Initialize Firebase
var config = require("./config.json")

firebase.initializeApp(config);

console.log(firebase)

var database = firebase.database()
var ref = database.ref('test')

// ref.push(sampledata)

ref.on('value', (data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});

//Home page
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

//triggered on confirmation of order
app.get('/confirm/:orderId', (req,res) => {
    let orderId = req.params.orderId;
    ref = database.ref('test/orderId')
    ref.on('value', (data) => {
        //let orderId = req.params.orderId;
        console.log(orderId);
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

