//Running app on port 3000
const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");

const app = express();

//Local files can be read from this folder
app.use(express.static("public"));

//using body-parsers to read post API data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "pug");

//Setting up server
const server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.post("/confirm_order/:orderId", (req, res) => {
  console.log("Order confirmed by chef : " + req.params.orderId);
  // Database update! # TODO
  res.send("DONE!");
});

app.post("/finished_order/:orderId", (req, res) => {
  console.log("Order finished : " + req.params.orderId);
  // Database update! # TODO
  res.send("done");
});

app.get("/", function(req, res) {
  res.render(__dirname + "/orderlist", {
    data: [
      {
        id: "123asas456",
        items: [
          { name: "Pizza", quantity: 2 },
          { name: "Pasta", quantity: 4 },
          { name: "msta", quantity: 4 },
          { name: "costa", quantity: 4 },
          { name: "fosta", quantity: 4 }
        ],
        status: "placed",
        table: 322,
        info: "Extra cheese in pizza and red sauce in pasta"
      },
      {
        id: "7891dsdc01",
        items: [{ name: "Pizza", quantity: 2 }, { name: "Pasta", quantity: 4 }],
        status: "placed",
        table: 322,
        info: "Extra cheese in pizza and red sauce in pasta"
      },
      {
        id: "1213ad14",
        items: [{ name: "Pizza", quantity: 2 }, { name: "Pasta", quantity: 4 }],
        status: "placed",
        table: 322,
        info: "Extra cheese in pizza and red sauce in pasta"
      },
      {
        id: "1516ascv17",
        items: [{ name: "Pizza", quantity: 2 }, { name: "Pasta", quantity: 4 }],
        status: "placed",
        table: 322,
        info: "Extra cheese in pizza and red sauce in pasta"
      }
    ]
  });
  // res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

// Initialize Firebase
var config = require("./config.json");

firebase.initializeApp(config);

console.log(firebase);

var database = firebase.database();
var ref = database.ref("test");
var sampledata = {
  name: "Akhil",
  order: "Noodles"
};

ref.push(sampledata);

ref.on("value", gotData, errData);

function gotData(data) {
  console.log(data.val());
}

function errData(err) {
  console.log("error");
  console.log(err);
}

console.log(database);
//var ref = database.ref('');
