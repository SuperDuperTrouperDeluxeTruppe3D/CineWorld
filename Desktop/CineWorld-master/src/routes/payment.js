const paypal = require("paypal-rest-sdk");
const {payment, booking, film} = require('../controllers/Controller.js');
let chosenFilm = '';
const model = require('../models/model');
const qr = require('qr-image');
const fs = require('fs');
const Cart = require('../models/cart');
let total = "";
let title = "";
let bookingIdentifier = "";


module.exports.routes = (app) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
        'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
    });


    app.get("/add-to-Cart/:id", (req, res) => {
        const bookingId = req.params.id;
        const cart = new Cart(req.session.cart ? req.session.cart : {});
        model.Booking.findById(bookingId).then(booking => {
            cart.add(booking, bookingId);
            req.session.cart = cart;
            res.render("cart",
                {
                    bookings: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    loggedin: req.isAuthenticated()
                });
        })
            .catch(err => console.log(err))
    })

        .get("/cart", (req, res) => {
            if (!req.session.cart) {
                res.render("cart", {bookings: null,  loggedin: req.isAuthenticated()});
            }
            const cart = new Cart(req.session.cart);
            //title = cart.item.filmTitle;
            //bookingIdentifier = cart.item._id;
            res.render("cart",
                {
                    bookings: cart.generateArray(),
                    totalPrice: cart.totalPrice,
                    loggedin: req.isAuthenticated()  // res.status.json() works!!
                });

            // payment.renderPayments(req, res);
        })

        .post('/payment', (req, res) => {
            /*chosenFilm = film.getFilmId();
            const total = booking.getTotal();*/

            if (!req.session.cart) {
                res.render("cart", {bookings: null});
            }
            const cart = new Cart(req.session.cart);
             total = cart.totalPrice;

            payment.createPayment(req, res, total);
            req.session.destroy();
        
        })
        .get("/success", (req, res) => {
            console.log("onSuccess");

            payment.excutePayment(req, res, total, chosenFilm);
        })
        .get('/qrcode', (req, res, next) => {



          //  const qr_txt = "www.CineWorld.com";
            const qr_txt = "title: "+  title + " booking id: " + bookingIdentifier;
            var qr_png = qr.imageSync(qr_txt, {type: 'png'});

// Generate a random file name
            let qr_code_file_name = new Date().getTime() + '.png';


            fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {

                if (err) {
                    console.log(err);
                }

            });

// Send the link of generated QR code
            res.send({
                'qr_img': "qr/" + qr_code_file_name
            });


        })
        .get("/cancel/:filmId", (req, res) => res.send("canceled"))

        .get("/checkout", (req, res) => {
            res.render("checkout")

        })

};