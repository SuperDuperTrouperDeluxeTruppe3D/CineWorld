const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, required: true,
        // unique: true
    },
    password: {type: String},
    //,
    //required: true },
    
    bookings: [{type: Schema.Types.ObjectID, ref: "Booking"}],
   
});
userSchema.plugin(passportLocalMongoose);

//film schema
const filmSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectID,
    title: {
        type: String
        // ,  required: true
    },
    description: String,
    playingTime: String,
    price: {
        type: Number
        //, required: true
    },
    date: {
        type: Date,
        // required: true
    },
    photo: {
        type: String,
        //required: true
    },
    user: {type: Schema.Types.ObjectID, ref: "User"},// creator
    genre: String,
    fsk: String,
    crew: String,
    start: Date,
    playingWeek: String,
    short: String,
    long: String,
    reserved: [{
        seat: Number,
        row: Number,
        adult: Boolean
    }]
    
});

const ratingSchema = new Schema({
    author: String,
    content: String
});

//order schema
const orderSchema = new Schema({
    _id: Schema.Types.ObjectId,
    productId: {type: Schema.Types.ObjectId, ref: "Film"},
    quantity: {type: Number, default: 1, required: true}
});

// paypal
const order_listSchema = new Schema({
    quantity: Number,
    purchaseName: String,
    purchasePrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    description: String
});

const releasedDateSchema = new Schema({
    releaseDate: String,
    releaseHour: [{time: String}]
});


const bookingSchema = new Schema({
    film: {type: Schema.Types.ObjectID, ref: "Film"},    // to be deleted
    filmTitle: String,
    user: {type: Schema.Types.ObjectID, ref: "User"},
    session: {type: Schema.Types.ObjectID, ref: "Session"},
    createdAt: Date,
    updatedAt: Date,
    date: [releasedDateSchema],
    price: Number,
    paymentId: String,
    saal: String,
    maxSeat: String,
    maxRow: String,
    reserved: [{    // to be deleted
        seat: Number,
        row: Number,
        adult: Boolean
    }],
    numberOfSeats: Number,
    session: {type: Schema.Types.ObjectId, ref: "Session"},
    paid: Boolean,

}, {timestamp: true});

const sessionSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: "Film"},
    hall: String,
    date: [ { filmDate : Date} ],
    reserved: [{
        seat: Number,
        row: Number,
        adult: Boolean,
        booking: { type: Schema.Types.ObjectID, ref: "Booking"}
    }],
    maxSeat: {type: Number, default: 22},
    maxRow: {type: Number, default: 22}
});

const cartSchema = new Schema({
    user: {type: Schema.Types.ObjectID, ref: "User"},
    cart: {type: Object, required: true},
    paymentId: {type: String, required: true},
    address: {type: String}
})


exports.User = mongoose.model("User", userSchema);
exports.Film = mongoose.model("Film", filmSchema);
exports.Rating = mongoose.model("Rating", ratingSchema);
exports.Booking = mongoose.model("Booking", bookingSchema);
exports.Session = mongoose.model("Session", sessionSchema);
exports.Order = mongoose.model("Order", orderSchema);
exports.Order_list = mongoose.model("Order_list", order_listSchema);
exports.CartOrder = mongoose.model("CartOrder", cartSchema); 