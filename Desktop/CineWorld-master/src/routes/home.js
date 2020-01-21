require('dotenv').config();
const mongoService = require('../controllers/MongoService');
const mongoose = require('mongoose');
const model = require('../models/model');
const {film, booking, payment} = require('../controllers/Controller');
const sortedBy = "title";
const numberOfMovies = 6;


module.exports.routes = (app) => {

    app.get("/",(req, res) => {

        film.viewSortedMovies(req, res, sortedBy, numberOfMovies);
    });

}

