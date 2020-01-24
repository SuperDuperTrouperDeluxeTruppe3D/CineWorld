//jshint esversion:6
//'use strict';
const _ = require("lodash");
const passport = require('passport');
const model = require('../models/model.js');
const bookings = require('./Booking.js');

const Booking = bookings.Booking;


const booking = new Booking();


/**
 * user regeseration and login
 * works
 */

class User {

    async createUser(req, res) { // postman
        const email = req.body.username;
        const password = req.body.password;

        try{
            await model.User.register({username: email},  password, (err, user)=>{
                if (err){
                    res.render("register");
                } else {
                    passport.authenticate("local")(req, res,()=>{
                        res.redirect("/");
                    });
                }
            });
  
        }catch(err){
            console.log(err);
        }
    }


    login(req, res) { // works
        const email = req.body.username;
        const password = req.body.password;
         const user = new model.User({
             username: email,
             password: password
         });
         req.login(user, (err)=>{
             if (err){
                 console.log( "error from login", err);
             } else {
                 passport.authenticate("local")(req, res, ()=>{
                     res.redirect("/");
                 });
             }
         });


   }

    user(userId) {
        return model.User.findById(userId)
            .then(user => {
                    console.log(user);
                    return {
                        ...user._doc,
                        _id: user.id,
                        bookedFimls: booking.Events.bind(this, booking._doc.bookedFimls)
                    };
                }
            )
            .catch(err => {
                console.log(err);
            });
    }


    findUser(username) { // works2

        // console.log("type is" + typeof username);
        if (arguments.length === 0) {
            // .find()
            // no args passed, return all usernames in an object
            return model.User.find()
                .then(users => {
                    return users;
                    return users.map(user => {
                        return user;
                    });
                })
                .catch(err => console.log(err));
        } else if (typeof username === "string") {

            return model.User.find({email: username})
                .then(user => {
                    return user;
                }).catch(err => console.log(err));
        } else {
            // unsupported arguments passed
            console.log("Unsupported");
        }
    }

    findUserById(userId) { // workes2

        if (userId.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            return model.User.findById(userId)
                .then(user => {
                    if (user) {
                        // return {...user._doc};
                        return user;
                    }
                })
                .catch(err => {
                    throw err;
                })

        } else {
            console.log("not a valid User-Id");
        }
    }
}

module.exports = {
    User: User
};