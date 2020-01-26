const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/check", (req, res) => {
        res.render("check", {
            loggedin: req.isAuthenticated(),
        })
    
});    


};