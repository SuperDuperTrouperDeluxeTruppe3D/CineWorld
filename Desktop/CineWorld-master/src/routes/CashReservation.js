const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/cashReservation", (req, res) => {
        res.render("cashReservation", {
            loggedin: req.isAuthenticated(),
        })
    })

};