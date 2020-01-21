const paypal = require("paypal-rest-sdk");
const { booking, film } = require('./Controller');
const model= require('../models/model')


class Payment {

    constructor() {
        this.paypalConfigure();
    }


    paypalConfigure() {
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
            'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
        });
    }




    async renderPayments(req, res){

            const username = req.user.username;
            console.log(username);
            let sessionArray = [];
            let seesionsIds = [];
            const user = await model.User.findOne({username: username}).exec();
       // const bookings = await model.Booking.find({_id: {$in: user._doc.id}}).exec();
        const bookings = await model.Booking.find({user: user._id, paid: false}).exec();

        res.render("payment", {
           bookings : bookings
        } );

    }

    async createPayment(req, res, total) {

        const create_payment_json = {

                "intent": "sale",
                "redirect_urls": {
                    "return_url": "http://localhost:3000/success",
                    "cancel_url": "http://localhost:3000/cancel"
                },
                "payer": {
                    "payment_method": "paypal"
                },
                "transactions": [
                    {
                        "amount": {
                            "total":total,
                            "currency": "EUR"
                        },
                        "description": "This is the payment transaction description.",
                    },
                ]

            };
        paypal.payment.create(create_payment_json, function(error, payment) {
            if (error) {
                console.log(" the error from here");
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href)

                    }
                }
            }
        });

    }


        async excutePayment(req, res, total, chosenFilm) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        console.log("exute payment",chosenFilm);
        const bookedFilm = await model.Film.find({title: chosenFilm}).exec();
         await model.Booking.findOneAndUpdate({title: bookedFilm._id}, {
            $set: {
                paymentId: paymentId,
                price: total
            }
        }).exec();

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "EUR",
                    "total": total
                }
            }]
        };

        await   paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                console.log(JSON.stringify(payment));
                res.render("check", {loggedin: req.isAuthenticated()});
            }
        });


    }

}

exports.Payment = Payment;
