//jshint esversion:6
//'use strict';
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

    async bookFilm(req, res, chosenFilm) {  // bookevent postman

        if (req.isAuthenticated()) {
            console.log('not authenticated from bookfilm')
        };

            const reservedSeats = req.body.myArray;
            console.log(Booking.total);
            const username = req.user.username;
            const customer = await model.User.findOne({username: username});
            let alreadyReserved = [];

            try {
                if (typeof reservedSeats !== "undefined") {
                    const fetchFilm = await model.Film.findOne({title: chosenFilm});
                    const session = await model.Session.findOne({productId: fetchFilm.id}).exec();

                    reservedSeats.forEach(seat => {
                        const seats = session.reserved.find(bookedSeat => Number(bookedSeat.seat) === Number(seat.seat)  && Number(bookedSeat.row) === Number(seat.row));
                        if (seats) {
                            alreadyReserved = seats;
                            console.log("hier seats", seats);
                        }
                    });

                    if (alreadyReserved.length === 0) {
                        for (let i = 0; i < reservedSeats.length; i++) {
                            session.reserved.push(reservedSeats[i]);
                        }
                        //session.save();
                        if (!customer) {
                            console.log("User not found");
                        }
                        const booking = new model.Booking({
                            user: customer._id,//username,
                            film: fetchFilm,
                        });

                        const result = await booking.save();
                        customer.bookedFimls.push(fetchFilm);
                        customer.save();
                        let text = fetchFilm.title + ' was booked successfully' + ' price ' + fetchFilm.price;

                        await reservedSeats.forEach(seat => {
                            if (typeof seat !== "undefined") {
                               /* return model.Session.findOneAndUpdate({productId: fetchFilm._id}, {
                                    $set: {
                                        row: seat.row,
                                        seat: seat.seat
                                    }
                                }).exec();*/
                               session.seat= seat.seat
                               session.row= seat.row
                            }
                        });
                        session.save();

                        await model.Booking.findOneAndUpdate({film: fetchFilm._id}, {
                            $set: {
                                price: Booking.total,
                                reserved: reservedSeats,
                                session: session._id
                            }
                        }).exec();

                        // await this.verfiyBooking(username, "Booking-verfyied", text);
                        //const response =  transformBooking(result);
                        res.json({
                            type: "success",
                            reserved: session.reserved
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
     /*   } else {
            res.render("login", {login: 'bitte melden Sie sich'});
        }*/
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
          console.log(session.reserved);
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
                user: 'moneeralkadeky@gmail.com',
                pass: ''
            }
        };

        let transporter = nodemailer.createTransport(smtpConfig);

        /* let transporter = nodemailer.createTransport({
             servcie: 'gmail',
             auth: {
                 user: '',
                 pass: ''
             }*/
        /*});*/

        let mailOptions = {
            from: 'moneeralkadeky@gmail.com',

            to: to,            //       'CineWorldWebsite@gmail.com',
            subject: subject,//'nodemailer test',
            text: text          //'It works'
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