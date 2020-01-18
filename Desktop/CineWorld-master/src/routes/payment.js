const paypal = require("paypal-rest-sdk");
const {payment, booking, film} = require('../controllers/Controller.js');
let chosenFilm = '';
const model = require('../models/model');
const Cart= require('../models/cart');



module.exports.routes = (app) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
        'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
    });



    app.get("/cart", (req, res) => {
        if(!req.session.cart){
             res.render("cart",  {bookings: null });
        }
        const cart = new Cart(req.session.cart);

        res.render("cart",
           { bookings: cart.generateArray(),
               totalPrice: cart.totalPrice  // res.status.json() works!!
           });

       // payment.renderPayments(req, res);
    })
        .get("/add-to-Cart/:id", (req, res) =>{
           const bookingId = req.params.id;
          const cart = new Cart(req.session.cart ? req.session.cart : {} );
          model.Booking.findById(bookingId).then(booking =>{
              cart.add(booking, booking._id);
              req.session.cart = cart;
              console.log(req.session.cart);
              res.redirect("payment")
          })
              .catch(err => console.log(err) )

        })

        .post('/payment', (req, res) => {
           chosenFilm =  film.getFilmId();
            const total =   booking.getTotal();
            payment.createPayment(req, res, total);

        })
        .get("/success", (req, res) => {



            console.log("onSuccess");
            const total =   booking.getTotal();
            payment.excutePayment(req, res, total, chosenFilm);
        })
        .get("/cancel/:filmId", (req, res) => res.send("canceled"))

        .get("/checkout", (req, res) => {
            res.render("checkout")

        })

};