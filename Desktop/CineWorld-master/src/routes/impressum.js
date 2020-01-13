const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/impressum", (req, res) => {
        res.render("impressum", {
            loggedin: req.isAuthenticated(),
        })
    })

};