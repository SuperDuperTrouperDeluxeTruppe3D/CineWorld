//jshint esversion:6
'use strict';
const mongoose = require("mongoose");
const express= require("express");
const model = require('../models/Model.js');
//const encrypt= require("mongoose-encryp");
const constant = require('../constants/constants.js');

mongoose.connect("mongodb://localhost:27017/kinoUserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.addNewUser = (req, res) => {
    console.log("adding a new User from the controller");
    const newUser = new model.User({
        email: req.body.username,
        password: req.body.password
    });
    newUser.save((err) => {
        if (err) {
            res.send(err);
            console.log(err);
        } else {
            res.render("dummyPage");
            res.json(newUser);
        }
    });
};
