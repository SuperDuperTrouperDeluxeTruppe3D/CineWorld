const paypal = require("paypal-rest-sdk");
const {booking, film} = require('./Controller');
const model = require('../models/model');
const Cart = require('../models/cart');

let total = "";
let cart = "";


class Payment {

    constructor() {
        this.paypalConfigure();
    }


    paypalConfigure() {
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': '',
            'client_secret': ''
        });
    }

    addToCart(req, res){

        const bookingId = req.params.id;
        this.cart = new Cart(req.session.cart ? req.session.cart : {});
        model.Booking.findById(bookingId).then(booking => {
            this.cart.add(booking, bookingId);
            req.session.cart = this.cart;
            res.render("cart",
                {
                    bookings: this.cart.generateArray(),
                    totalPrice: this.cart.totalPrice
                });
        })
            .catch(err => console.log(err))
    }

    reduce(req, res) {
        var productId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        cart.reduceByOne(productId);
        req.session.cart = cart;
        if (cart.generateArray.length == 0) {
            res.redirect("/")
        }else {
        res.redirect("/cart");
        }
    }

    cancelTickt(bookingId) {
        model.Booking.findById(bookingId)
            .then(results => {
                if (results) {
                    model.Session.findByIdAndUpdate(
                        results.session , { $pull: { "reserved": { booking: bookingId} } },
                        { safe: true, upsert: true },
                        function(err, node) {
                            if (err) {
                                console.log(err)
                            }else{
                                console.log(node);
                            }
                        });
                }
            })
            .catch(err => console.log(err));
    }

    async renderPayments(req, res){
        console.log(req.session.cart);
        if (!req.session.cart) {
            res.render("cart", {bookings: null});
        }else {
            const cart = await new Cart(req.session.cart ? req.session.cart : {});
            const cartArray = await cart.generateArray();
            res.render("cart",
                {
                    bookings: cartArray,
                    totalPrice: cart.totalPrice
                });
        }
    }

    async initalizePayment(req, res){

        if (!req.session.cart) {
            res.render("cart", {bookings: null});
        }

        total = this.cart.totalPrice;

       await this.createPayment(req, res, total);
        req.session.destroy();
    }

    async createPayment(req, res, total) {

        const create_payment_json = {

                "intent": "sale",
                "redirect_urls": {
                    "return_url": "http://supertrouper3d.herokuapp.com/success",
                    "cancel_url": "http://supertrouper3d.herokuapp.com/cancel"
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


    async excutePayment(req, res, chosenFilm) {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        
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

          /*  const order = await model.CartOrder({
                user: req.user,
                paymentId: paymentId,
                cart: this.cart
            }). save();*/

        await paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
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
