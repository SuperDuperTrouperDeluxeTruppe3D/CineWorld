'use strict';
const constant = require("../constants/constants");
const model = require("../models/model");
const {booking} = require('../controllers/Controller.js');
const {film} = require('../controllers/Controller.js');


module.exports.routes = (app) => {

    app.get("/booking", (req, res) => {
        const chosenFilm = film.getFilmId();
        booking.renderBooking(req, res, chosenFilm);
    })
        .post("/booking", (req, res) => {
             // const objArray = req.body.myArray;
             const total = req. body.sum;
             booking.setTotal(total);
             const chosenFilm = film.getFilmId();
               booking.bookFilm(req, res, chosenFilm);

            /*   const updated = async () => {
                   try {
                       for (let i = 1; i < objArray.length; i++) {
                           if (typeof objArray[i] !== "undefined") {
                               model.Booking.findOneAndUpdate({title: chosenFilm}, {
                                   $set: {
                                       row: objArray[i].row,
                                       seat: objArray[i].seat
                                   }
                               }).exec();
                           }
                       }
                   } catch (err) {
                       console.log("error from here");
                   }
               }*/


        })
        .delete("/booking", (req, res) => {
            booking.cancelBooking(req, res);
        })


};