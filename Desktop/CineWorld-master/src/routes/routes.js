"use strict";

const homeRouter = require('./home');
const authenticateRouter = require('./authentication');
const filmRouter = require('./films');
const bookingRouter = require('./booking');
const ratingRouter = require('./ratings');
const pricingRouter = require('./pricing');
const contact = require('./contact');
const payment = require('./payment');
const checker = require('./check');
const imp = require('./impressum');
const dat = require('./datenschutz');
const noCheck = require('./noChecking');
const reserv = require('./CashReservation');
const downloasder = require('./download');
const searchBar = require('./searchBarRouter');
const demo = require('./demo');


module.exports.routes = (app) => {

    homeRouter.routes(app);
    authenticateRouter.routes(app);
    filmRouter.routes(app);
    bookingRouter.routes(app);
    ratingRouter.routes(app);
    pricingRouter.routes(app);
    contact.routes(app);
    payment.routes(app);
    checker.routes(app);
    imp.routes(app);
    dat.routes(app);
    noCheck.routes(app);
    reserv.routes(app);
    downloasder.routes(app);
    searchBar.routes(app);
    demo.routes(app);

};


