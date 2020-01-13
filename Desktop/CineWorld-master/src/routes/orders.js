"use strict";

const controller = require('../controllers/Controller.js');
const constant = require('../constants/constants.js');
const mongoose = require('mongoose');
const model = require('../models/model.js');


module.exports.routes = (app) => {

    app.get("/", (req, res ) => {
        model.Order.find()
            .select("productId quantity _id")
            .populate("productId")
            .exec()
            .then(docs => {
                res.status(200).json({
                    count: docs.length,
                    orders: docs.map(doc => {
                        return {
                            ...doc._doc,
                            request: {
                                type: "GET",
                                url: "https://supertrouper3d.herokuapp.com/orders/" + doc.id
                            }
                        }
                    })
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            });

    })

        .post("/orders", (req, res) => {

        });
};
