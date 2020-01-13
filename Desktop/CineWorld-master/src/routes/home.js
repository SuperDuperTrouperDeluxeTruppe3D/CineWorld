require('dotenv').config();
const constant = require('../constants/constants.js');
const mongoService = require('../controllers/MongoService');
const mongoose = require('mongoose');
const model = require('../models/model');
const {film, booking} = require('../controllers/Controller');
const nodemailer = require('nodemailer');
const { ObjectID } = require('../helpers/objectID');
const sortedBy = "title";
const numberOfMovies = 6;
const date = require('../helpers/date');

/*const sendgridMail = require('@sendgrid/mail');
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    to : 'moneerlkadeky@gmail.com',
    from: 'moneeralkadeky@gmail.com',
    subject: 'from sendgrid',
    text: 'here is the message',
    html: '<strong> html is here </strong>'
}; */

module.exports.routes = (app) => {
    app.get("/",(req, res) => {

        //sendgridMail.send(msg);

          film.viewSortedMovies(req, res, sortedBy, numberOfMovies);
    });     
}

