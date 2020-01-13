const model = require('../models/model');
module.exports.routes = (app) => {

    app.post("/searchBar", (req, res) => {
        const filmTitle = req.body.film;
        console.log(filmTitle);

        model.Film.findOne({"title": {$regex: /filmTitle /, $options: 'i'}},
            (err, film) => {
                if (film) {
                    console.log("fromsearch", film);
                    res.redirect("films/" + film.title);
                } else {
                  console.log("err", err);
                }
            });
    })

};

