'use strict';
const constant = require("../constants/constants");
const model = require("../models/model");
const {booking} = require('../controllers/Controller.js');
const {film} = require('../controllers/Controller.js');
let sessionId = ""


module.exports.routes = (app) => {

    app.get("/booking/:id", (req, res) => {
        sessionId= req.params.id;
        const chosenFilm = film.getFilmId();
        booking.renderBooking(req, res, chosenFilm);
    })
        .post("/booking", (req, res) => {
             const total = req. body.sum;
             booking.setTotal(total);
            // const chosenFilm = film.getFilmId();
               booking.bookFilm(req, res,  sessionId);

        })
        .delete("/booking", (req, res) => {
            booking.cancelBooking(req, res);
        })



};