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
        payment.addToCart(req, res);
    })

    .get("/reduce/:id", (req, res)=>{
        var productId = req.params.id;
        console.log(productId);
        this.cart = new Cart(req.session.cart ? req.session.cart : {});
        this.cart.reduceByOne(productId);
        req.session.cart = cart;
        if (this.cart.generateArray.length === 0) {
            res.redirect("/")
        }else {
        res.redirect("/cart");
        }
        
        
        //payment.reduce(req, res);
    })

    
    .get("/cart", (req, res) => {
        payment.renderPayments(req, res)
    })

        .post('/payment', (req, res) => {
           payment.initalizePayment(req, res);

        })
        


        .get("/success", (req, res) => {
            console.log("sucess route")
            chosenFilm = film.getFilmId();
            payment.excutePayment(req, res,chosenFilm );
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

        .get("/profile", (req, res)=>{
            model.CartOrder.find({ user: req.user}, (err, orders)=>{
                var cart;
                orders.forEach(function (order) {
                    cart = new Cart(order.cart);
                    cart.generateArray();
                });
                res.status(200).json(orders);
   
            })
           });



};