//jshint esversion:6
'use strict';
const _ = require("lodash");
const mongoose = require("mongoose");
const model = require('../models/model.js');
const {dateToString} = require('../helpers/date.js');
const  constant  = require('../constants/preview');
const {transformEvent} = require('./merge');


/**
 * film class
 * all methods works, navigate very slow
 */

class Film {
    static  filmId = "";

    async findFilmEvents(req, res) { // postman2, events, await, transformEvent
        try {
            const events = await model.Film.find()
                .populate("user");
            const response = events.map(film => {
                return transformEvent(film)
            });
            res.status(200).json(response);
        } catch (err) {
            throw err;
        }
    }

      async preview(req, res) {
       /* const preview = await  model.Film.find({title: {$in: constant.preview.movies}})*/
          const preview = await  model.Film.find({})
            .select("  title genre photo")
            .exec();

            res.render("films",
                    {
                        movies: preview,
                        loggedin: req.isAuthenticated()
                    } );
    }

    async viewSortedMovies(req, res, sortedBy, numberOfMovies){
        await model.Film.find().sort(sortedBy).limit(numberOfMovies)
            .exec(function (err, posts) {
                res.render("home", 
                {
                    movies: posts,
                    loggedin: req.isAuthenticated()
                });
            });
    }


    async addFilm(req, res) {  //postman2 // createEvent
        /*if (!req.isAuth) {
            throw new Error("Unauthenticated!");
        }*/
        const film = new model.Film({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            price: req.price,
            playingTime: req.body.playingTime,
            date: req.body.date,
            photo: req.body.photo,
            user: req.userId
        });
        let addedFilm;
        try {
            const result = await film.save();
            addedFilm = transformEvent(result);
            /* addedFilm = {
                 ...result._doc,
                 _id: result.id,
                // date: dateToString(result._doc.date),
                 user: fc_user.bind(this, result._doc.user)
             };*/
            const user =   await model.User.findById(req.userId);
            if (!user) {
                throw new Error("User  not found")
            }
            user.bookedFimls.push(film);
            user.save();
            res.status(200).json({
                ...result._doc,
                _id: result.id
            });
            return addedFilm;
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    getFilmId(){
        return Film.filmId;
    }

    async renderFilmInfos(req, res) {
        const requestedFilm = req.params.filmId;
        

        try {
            const Films = await model.Film.findOne({title: requestedFilm}).exec();
            Film.filmId = requestedFilm;
            const session = await model.Session.findOne({productId: Films.id}).exec();
            let todaysview = '';
            let tomorrowsview = '';
            let aftertomorrowView;
            for(let i=0; i < session.date.length; i++){
                  todaysview = session.date[0].filmDate+ '';
                  tomorrowsview = session.date[1].filmDate + '';
                  aftertomorrowView = session.date[2].filmDate + '';
            }
            const dateArray = todaysview.split(" ");
            const today = dateArray.slice(0, 4);
            const formatedDate = today[0]+ '-' + today[1]+ '-'+ today[3];
            const hour = dateArray.slice(4, 5);

            const dateArrayTomorrow = tomorrowsview.split(" ");
            const tomorrow = dateArrayTomorrow.slice(0, 4);
            const formatedDateTomorrow = tomorrow[0]+ '-' + tomorrow[1]+ '-'+ tomorrow[3];
            const hourTomorrow = dateArrayTomorrow.slice(4, 5);

            const dateArrayAfterTomorrow = aftertomorrowView.split(" ");
            const aftertomorrow = dateArrayAfterTomorrow.slice(0, 4);
            const formatedDateAfterTomorrow = aftertomorrow[0]+ '-' + aftertomorrow[1]+ '-'+ aftertomorrow[3];
            const hourAfterTomorrow = dateArrayAfterTomorrow.slice(4, 5);

           if(Films){
               res.status(200).render("filmItem", {
                   // film: Films,
                   title: Films.title,
                   genre: Films.genre,
                   fsk: Films.fsk,
                   laenge: Films.laenge,
                   crew: Films.crew,
                   start: Films.start,
                   spielwoche: Films.playingTime,
                   short: Films.short,
                   long: Films.long,
                   foto: Films.photo,
                   reserved: Films.reserved,
                   heute: formatedDate,
                   morgen: formatedDateTomorrow,
                   uebermorgen:formatedDateAfterTomorrow,
                   hour: hour,
                   loggedin: req.isAuthenticated()
               });
           }

        } catch (err) {
            console.log("err from renderfilm", err);
        }
    }

    // postman
    findFilmById(req, res) {
        const id = req.params.filmId;
        const film = model.Film.findById(id)
            .select("_id title description playingtime price date photo user")
            .then(foundFilm => {
                if (foundFilm) {
                    res.status(200).json({
                        films: foundFilm._doc,
                        url: {
                            type: "GET",
                            url: "https://supertrouper3d.herokuapp.com/films/" + foundFilm.id
                        }
                    });
                } else {
                    res.status(404).json({message: "No valid entry was found"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({Error: err})
            });
        //  return film;
    }

    findfilms(req, res) { // postman events
        return model.Film.find()
            .select("_id title description playingtime price date photo user")
            .exec()
            .then(foundFilms => {
                const response = {
                    count: foundFilms.length,
                    films: foundFilms.map(film => {
                        return {
                            ...film._doc,
                            _id: film.id,
                            request: {
                                type: "GET",
                                url: "https://supertrouper3d.herokuapp.com/films/" + film.id
                            }
                        };
                    })
                };
                res.status(200).json({response});
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({Error: err})
            });
    }

    addAFilm(req, res) {  //works postman
        const film = new model.Film({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            playingTime: req.body.playingTime,
            date: req.body.date,
            photo: req.file.path,
            user: "5dfce3fb1c9d440000e89fb3"
        });
        film.save()
            .then(result => {
                if (!result) {
                    return res.status(404).json({
                        message: "Film not found"
                    });
                }
                res.status(200).json({
                    message: "Successfully added a new Film",
                    film: {
                        ...result._doc,
                        request: {
                            type: "GET",
                            url: "https://supertrouper3d.herokuapp.com/films/" + result.id
                        }
                    }
                });
                return result;
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({Error: err})
            });

    }

    deleteFilm(req, res) {
        const id = req.params.filmId;
        const deletedFilm = model.Film.deleteOne({_id: id})
            .exec()
            .then(result => {
                res.status(200).json({
                    message: "successfully deleted the product",
                    request: {
                        type: "POST",
                        url: "https://supertrouper3d.herokuapp.com/films",
                        body: {title: "String", price: "Number"}
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({Error: err});
            });
    }

    update(req, res) { // not working-> body is not array// vid5
        const id = req.params.filmId;
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        model.Film.update({_id: id}, {$set: updateOps})
            .exec()
            .then(result => {
                console.log(result);
                res.status(500).json({
                    message: "film updated",
                    request: {
                        type: "GET",
                        url: "https://supertrouper3d.herokuapp.com/films/" + id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({Error: err});
            });
    }

}

exports.Film = Film;