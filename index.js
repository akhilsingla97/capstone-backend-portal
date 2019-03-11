//Running app on port 3000
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');

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

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAaU5BI_arfcL8A3chEdBkW1iXgRd0JjgM",
    authDomain: "testagent-d5375.firebaseapp.com",
    databaseURL: "https://testagent-d5375.firebaseio.com",
    projectId: "testagent-d5375",
    storageBucket: "testagent-d5375.appspot.com",
    messagingSenderId: "541719630777"
};	

firebase.initializeApp(config);

console.log(firebase)

var database = firebase.database()
var ref = database.ref('test')
var sampledata = {
	name: "Akhil",
	order: "Noodles"
}

ref.push(sampledata)

ref.on('value', gotData, errData)

function gotData(data){
	console.log(data.val())
}

function errData(err){
	console.log('error');
	console.log(err);
}

console.log(database)
//var ref = database.ref('');


