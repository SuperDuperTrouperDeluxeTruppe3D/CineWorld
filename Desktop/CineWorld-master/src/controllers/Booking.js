//jshint esversion:6
//'use strict';
require('dotenv').config();
const _ = require("lodash");
const model = require('../models/model.js');
const controller = require('./Controller.js');
const {transformEvent, transformBooking} = require('./merge');
const constant = require("../constants/constants");
const nodemailer = require('nodemailer');
const date = require('../helpers/date');
const mongoService = require('./MongoService');
const {ObjectID} = require('../helpers/objectID');

class Booking {


    static total = "";

    getTotal() {
        return Booking.total;
    }

    setTotal(total) {
        Booking.total = total;
    }

    async findBooking(req, res) { // Booking

        if (req.isAuthenticated()) {
            try {
                const bookings = await model.Booking.find()
                    .populate("user film");
                const response = {
                    count: bookings.length,
                    booking: bookings.map(booking => {
                        return transformBooking(booking);
                    })
                };
                return res.status(200).json({response});
            } catch (err) {
                throw err;
            }
        } else {
            res.render("/login");
        }
    }

    async bookFilm(req, res, sessionId) {  // bookevent postman

        if (req.isAuthenticated()) {

            const reservedSeats = req.body.myArray;
            const username = req.user.username;
            const customer = await model.User.findOne({username: username});
            let alreadyReserved = [];

            try {
                if (typeof reservedSeats !== "undefined") {
                    const session = await model.Session.findById({_id: sessionId}).exec();

                    reservedSeats.forEach(seat => {
                        const seats = session.reserved.find(bookedSeat => Number(bookedSeat.seat) === Number(seat.seat) && Number(bookedSeat.row) === Number(seat.row));
                        if (seats) {
                            alreadyReserved = seats;
                            console.log("hier seats", seats);
                        }
                    });

                    if (alreadyReserved.length === 0) {

                        const film = await model.Film.findById({_id: session.productId}).exec();
                        const booking = new model.Booking({
                            user: customer._id,//username,
                            session: session._id,
                            price: Booking.total,
                            paid: false,
                            numberOfSeats: reservedSeats.length,
                            filmTitle: film.title
                        });
                        await booking.save();
                        const sessionReserved = reservedSeats.map(obj => {
                            return {
                                seat: obj.seat,
                                row: obj.row,
                                adult: obj.adult,
                                booking: booking._id,

                            }
                        });
                        for (let i = 0; i < sessionReserved.length; i++) {
                            session.reserved.push(sessionReserved[i]);
                        }
                        session.save();
                        customer.bookings.push(booking);
                        customer.save();

                        //let text = fetchFilm.title + ' was booked successfully' + ' price ' + fetchFilm.price;
                        //await this.verfiyBooking(username, "Booking-verified", text);
                        res.json({
                            type: "success",
                            reserved: session.reserved,
                            bookingId: booking._id
                        });
                    } else {
                        res.json({
                            type: "error",
                            seats: alreadyReserved,

                        });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("from else statement")
            res.json({
                type: "error",
                redirect: 'reider'
            });
        }
    }

    async cancelBooking(req, res) {
        if (!req.isAuthenticated()) {
            res.status(500).json({message: 'please Login'});
            res.render('login')
        }
        try {
            const booking = await model.Booking.findById(req.body.bookingId).populate("film");
            const event = transformEvent(booking.film);
            await model.Booking.deleteOne({_id: req.body.bookingId});
            res.status(200).json(event);
        } catch (err) {
            throw err
        }
    }

    async renderBooking(req, res, chosenFilm) {

        const result = await model.Film.findOne({title: chosenFilm})
            //  .select("title saal spielZeit")
            .exec();
        const session = await model.Session.findOne({productId: result.id});
        res.render("booking", {
            results: result,
            isTaken: session.reserved,
            maxSeat: "22",
            maxRow: "22"
        });
    }

    async verfiyBooking(to, subject, text) {

        var smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'test@gmail.com',
                pass: process.env.PASSWORD
            }
        };

        let transporter = nodemailer.createTransport(smtpConfig);

        let mailOptions = {
            from: 'test@gmail.com',

            to: 'test@gmail.com',  //req.user.email
            subject: 'nodemailer test',
            text: 'It works'
        };
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log("err ocuurs", err);
            } else {
                console.log('Emaill sent!!')
            }
        });
    }

}

exports.Booking = Booking;