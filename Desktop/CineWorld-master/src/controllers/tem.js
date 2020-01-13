/*session.date = [
                          {filmDate: date.dateToString("2020-01-10T09:55:39.483Z")},
                          {filmDate: date.dateToString("2020-02-10T09:55:39.483Z")},
                          {filmDate: date.dateToString("2020-03-10T09:55:39.483Z")}
                      ];*/









//bookFilm method to add seats
/*
for (let i = 0; i < reservedSeats.length; i++) {
    booking.reserved.push(reservedSeats[i]);
}

        //const updatedFilm = await model.Film.findOneAndUpdate({title: chosenFilm},{reserved: reservedSeats});
*/
/* seats = await model.Booking.find({'reserved.seat': reservedSeats.seat,
               'reserved.row': reservedSeats.row},
           {'reserved.$': 1}).exec();*/

/* **************************************************************************************
before async await
const events = eventIds => {
    return model.Film.find({_id: {$in: eventIds}})
        .then(events => {
            return events.map(event => {
                return {
                    ...event._doc,
                    _id: event.id,
                    user: user.bind(this, event.user)
                };
            });
        })
        .catch(err => {
            throw err;
        })
}


* findFilmEvents(req, res) { // postman2, events
        return model.Film.find()
            .populate("user")
            .then(films => {
                return res.status(200).json({
                    film: films.map(film => {
                       return {
                            film: film._doc,
                           date: new Date(film._doc.date).toString(),
                            user: user.bind(this, film._doc.user)
                        };

                    })
                });
            })
            .catch(err => {
                console.log("error from this mehtod");
                throw err;
            });
    }
*




    addFilm(req, res) {  //postman2 // createEvent
        console.log(req.body)
        const film = new model.Film({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            price: req.price,
            playingTime: req.body.playingTime,
            date: req.body.date,
            photo: req.body.photo,
            user: "5e00e055da84e96e7cc8e742"
        });
        let addedFilm;
        return film
            .save()
            .then(result => {
                addedFilm = {...result._doc, _id: result.id};
                return model.User.findById("5e00e055da84e96e7cc8e742")
            })
            .then(user => {
                if (!user) {
                    throw new Error("User  not found")
                }
                user.bookedFimls.push(film);
                return user.save();
            })
            .then(result => {
                res.status(200).json({
                    ...result._doc,
                    _id: result.id,
                    user: user.bind(this, result._doc.user)
                });
                return addedFilm;
            })
            .catch(err => {
                console.log(err);
            });
    }

* before async await

********************************************************************************************/






/* overloading of findfilm

/* findFilm(req, res) { //workds2
         const title = req.body.title;

         console.log("type of arg is " + typeof title);
         if (arguments.length === 0) {
             // .find()

             return model.Film.find()
                // .select() name of the fileds you want to be fetched
                 .then(films => {
                     return films.map(film => {
                         return {...film._doc, _id: film.id};
                         res.send(films);
                     })
                     const film = {

                     }
                     // return films; //this works also, without map
                 })
                 .catch(err => {
                     throw err
                 });

         } else if (typeof title === "string") {

             return model.Film.find({title: title})
                 .then(foundedFilm => {
                         return foundedFilm.map(film => {
                             return {...film._doc, _id: film.id}; // film.id shortcut for film._doc._id.toString()
                             res.send(film);
                         })
                     }
                 )
                 .catch(err => {
                     console.log(err);
                 });
         } else {
             // unsupported arguments passed
             console.log("Unsupported");
         }
         return;
     }*/










/*

//console.log(foundFilm);
/!*  const bookEvent =  async args => {
      const booking = new model.Booking({
          user: username,
          film: filmTitle
      });
          const results = await booking.save();

          return {
              ...results._doc
          };
  }*!/

   events(filmIds) { //events
        return model.Film.find()
            .populate("user")
            .then(films => {
                return films.map(film => {
                    return {
                        ...film._doc,
                        _id: film.id,
                         user: {
                            ...film._doc.user._doc,
                             _id: film._doc.user.id
                         }
                    };
                });
            })
            .catch(err => {
                console.log(err);
            })
    } //works with populate

     user(userId) {
        return model.User.findById(userId)
            .then(user => {
                    return {
                        ...user._doc,
                        _id: user.id,
                        bookedFimls : this.events.bind(this, user._doc.bookedFimls)
                    };
                }
            )
            .catch(err => {
                console.log(err);
            });
    }






/!* const booking = new model.Booking({
     user: username,
     film: filmTitle
 })
     .save()
     .then(createdBoooking => { return createdBoooking;
         /!*return {
             ...createdBoooking
             //user: model.User.bind(booking._doc.user),
             //film: model.Film.bind(booking._doc.film)
         };*!/
     })
     .catch(err => {
         console.log(err)
     });*!/





findUser(username) { // works, overloading ok

    console.log("type is" + typeof username);
    if (arguments.length === 0) {
        // .find()
        // no args passed, return all usernames in an object
        return model.User.find()
            .then(users => {
                return users;
                console.log(users);
                return users.map(user => {
                    return {...user._doc};
                });
            })
            .catch(err => {
                throw err
            });

    } else if (typeof username === "string") {

        model.User.find({email: username})
            .then(user => {
                console.log(user);
                return {...user._doc};
            }).catch(err => {
            console.log(err);
        })

    } else {
        // unsupported arguments passed
        console.log("Unsupported");
    }

}*/


/*

resultFactory(result) {

    if (Object.prototype.toString.call(result) === '[object Array]') {
        result.forEach((item, index) => {
            result[index] = new this(item);
        });
    }

    if (Object.prototype.toString.call(result) === '[object Object]') {
        if (result.hasOwnProperty('value') && !result.hasOwnProperty('_id')) {
            if (result.value) {
                result = new this(result.value);
            } else {
                result = undefined;
            }
        } else if (result.hasOwnProperty('ops')) {
            result.ops.forEach((item, index) => {

                result.ops[index] = new this(item);
            });

            result = result.ops;
        } else if (result.hasOwnProperty('_id')) {
            result = new this(result);
        }
    }
    return result;
}
*/
