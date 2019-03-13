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
  res.render(__dirname + "/orderlist", {
    data: [
      {
        id: "2113131212131232",
        item: "Pizza",
        quantity: 3,
        status: "placed",
        table: 322,
        info: "None"
      },
      {
        id: "211323de212131232",
        item: "Pasta",
        quantity: 2,
        status: "placed",
        table: 322,
        info: "None"
      }
    ]
  });
});


