const constant = require('../constants/constants.js');
module.exports.routes = (app) => {

    app.get("/check", (req, res) => {
        res.render("check", {
            loggedin: req.isAuthenticated(),
        })

        var nodemailer = require('gmail-send')({
            user: 'michel.meier555@gmail.com',
            pass: 'sam.Gnus',
            to: 'he.riedel@gmx.net',
            subject: 'test',
            text: 'test-text'
        })
    
});    


};