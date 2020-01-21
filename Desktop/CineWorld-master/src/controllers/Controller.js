//jshint esversion:6
'use strict';

const users = require('./User.js');
const films = require('./Film.js');
const bookings = require('./Booking.js');
const payments = require('./Payment');

const User = users.User;
const Film = films.Film;
const Booking = bookings.Booking;
const Payment = payments.Payment;

const user = new User();
const film = new Film();
const booking = new Booking();
const payment = new Payment();





module.exports = {
    user    : user,
    film    : film,
    booking : booking,
    payment : payment
};


//module.exports.User = new User();


