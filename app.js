//jshint esversion:6
require('dotenv').config();
const express= require("express");
const bodyParser = require("body-parser") ;
const ejs = require("ejs");
const  routes = require('./src/routes/Routes.js');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

routes.routes(app);
app.listen(3000, () => console.log("Server started on port 3000"));
