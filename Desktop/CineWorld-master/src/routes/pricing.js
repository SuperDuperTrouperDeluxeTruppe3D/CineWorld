const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/pricing", (req, res) => {
        res.render("pricing", {
            loggedin: req.isAuthenticated(),
        })
    })

};