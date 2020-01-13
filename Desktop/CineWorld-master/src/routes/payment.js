const paypal = require("paypal-rest-sdk");
const {payment, booking, film} = require('../controllers/Controller.js');
let chosenFilm = '';
const model = require('../models/model');



module.exports.routes = (app) => {

    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AcriMC4sfpa8lp6hu9-hVzGfslrywuCwDYQi-inJeDoK_E51YtOOpRHx0CX9HNrpu_OcKSrQVYplbEuA',
        'client_secret': 'EPA_Gmn7E3XCe-V7_z1Qs29EdqZDahZ9rb7AaMyQalFBP9RIbvs5KY4IKITNIzfOqMTAy5kIp7cAVD5G'
    });



    app.get("/payment", (req, res) => {

        const reservedFilm =  film.getFilmId();
        const filmModel = model.Film.findOne( {title: reservedFilm}).exec();
        const session = model.Session.findOne({productId: filmModel._id}).exec();
        const booking = model.Booking.findOne({productId: filmModel._id, session: session._id}).exec();

        res.render("payment", {
            title: filmModel.title,
            session: session,
            reserved: booking.reserved
        });
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