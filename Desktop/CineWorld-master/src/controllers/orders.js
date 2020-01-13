/*
.get("/orders", (req, res) => {
    model.Order.find()
        .select("productId quantity _id")
        .populate("productId", "title description")//agrs: what product, what fields of products
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        ...doc._doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc.id
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
        model.Film.findById(req.body.productId)
            .then(product => {
                const order = new model.Order({
                    _id: mongoose.Types.ObjectId(),
                    quantity: req.body.quantity,
                    productId: req.body.productId
                });
                return order
                    .save()
            })
            .then(result => {
                res.status(200).json({
                    message: "Successfully added a new Order",
                    order: {
                        ...result._doc,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + result.id
                        }
                    }
                });
                return result;
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            })
    })
*/