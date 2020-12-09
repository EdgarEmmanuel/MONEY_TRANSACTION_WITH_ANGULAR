var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
//set the db of the database
const db = require("./models/index.js");
var emetteur = db.Emetteur;
var app = express();

//enable request from the Angular project
var corsOptions = {
    origin: "http://localhost:4200"
};
app.use(cors(corsOptions));

require("./apis/controller")(app,emetteur,db);
require("./apis/post_controller")(app,bodyParser,db);

app.listen(3000,()=>{console.log("listening on port 3000..")});