const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/datenschutz", (req, res) => {
        res.render("datenschutz", {
            loggedin: req.isAuthenticated(),
        })
    })

};