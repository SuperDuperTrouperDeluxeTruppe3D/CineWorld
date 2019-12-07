"use strict";
const mongoose = require("mongoose");
const addNewUser = require('../controllers/Controller.js');
const model = require('../models/Model.js');
const constant = require('../constants/constants.js');

mongoose.connect("mongodb://localhost:27017/kinoUserDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports.routes = (app) => {
    app.get("/", (req, res) =>
        res.render("home", {
            initialAutohr: constant.initialRating.author,
            initialRating: constant.initialRating.Rating
        }))

        .get("/login", (req, res) => res.render("login"))

        .get("/register", (req, res) => res.render("register"))
        //.post("/register",  ()=> addNewUser )

        .get("/ratings", (req, res) => {
            res.render("ratings", {
                initialAutohr: constant.initialRating.author,
                initialRating: constant.initialRating.Rating
            });
        })

        .post("/register", (req, res) => {
            const newUser = new model.User({
                email: req.body.username,
                password: req.body.password
            });
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render("dummyPage");
                }
            });
        })

        .post("/login", (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            model.User.findOne({
                email: username
            }, (err, foundUser) => {
                if (!err) {
                    if (foundUser) {
                        if (foundUser.password === password) {
                            res.render("dummyPage");
                        }
                    }
                } else {
                    console.log(err);
                }
            });
        });
};
