const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/noCheck", (req, res) => {
        res.render("noCheck", {
            loggedin: req.isAuthenticated(),
        })
    })

}