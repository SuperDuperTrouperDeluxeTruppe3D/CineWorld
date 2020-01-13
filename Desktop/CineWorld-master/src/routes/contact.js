const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/contact", (req, res) => {
        res.render("contact", {
            loggedin: req.isAuthenticated(),
        })
    })

};