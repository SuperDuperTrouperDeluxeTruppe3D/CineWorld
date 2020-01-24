const controller = require('../controllers/Controller.js');

module.exports.routes = (app) => {

    app.get("/login", (req, res) => {
        if (req.isAuthenticated()) {
            res.render("dummyPage",
                {
                    text: "Your are already logged in"
                });
        } else {
            res.render("login", {
                login: 'Login'
            });
        }

    })

        .post("/login", (req, res) => {
            controller.user.login(req, res);
        })
        .get("/logout", (req, res) => {
            req.logout();
            req.session.destroy();
            res.redirect("/");
        })
        .get('/signup', (req, res) => {
            res.render('signup')
        })
        .get("/register", (req, res) => {
            if (req.isAuthenticated()) {
                res.render("dummyPage",
                    {
                        text: "Your are already registered"
                    });
            } else {

                res.render("register")
            }
        })

        .post("/register", (req, res) => {
               controller.user.createUser(req, res);

        })
};


