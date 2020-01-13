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
    bookedFimls: [{type: Schema.Types.ObjectID, ref: "Film"}],
    token: String,
    tokenExpiration: Number
});
userSchema.plugin(passportLocalMongoose);


const reservationSchema = new Schema({
    seat: Number,
    row: Number,
    adult: Boolean

});
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
    //  { type:  [reservationSchema ] , default: undefined}
});

const previewSchema = new Schema({
    title: String,
    genre: String,
    photo: String
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
    film: {type: Schema.Types.ObjectID, ref: "Film"},
    user: {type: Schema.Types.ObjectID, ref: "User"},
    createdAt: Date,
    updatedAt: Date,
    date: [releasedDateSchema],
    price: Number,
    paymentId: String,
    saal: String,
    maxSeat: String,
    maxRow: String,
    reserved: [{
        seat: Number,
        row: Number,
        adult: Boolean
    }],
    session: {type: Schema.Types.ObjectId, ref: "Session"},
}, {timestamp: true});

const sessionSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: "Film"},
    hall: String,
    //date: Date,
    date: [ { filmDate : Date} ],
    reserved: [
        {
            seat: Number,
            row: Number,
            adult: Boolean,
            hour: String
        }
    ]
    ,
    maxSeat: {type: Number, default: 22},
    maxRow: {type: Number, default: 22}
});


exports.User = mongoose.model("User", userSchema);
exports.Film = mongoose.model("Film", filmSchema);
exports.Preview = mongoose.model("Preview", previewSchema);
exports.Rating = mongoose.model("Rating", ratingSchema);
exports.Booking = mongoose.model("Booking", bookingSchema);
exports.Session = mongoose.model("Session", sessionSchema);
exports.Order = mongoose.model("Order", orderSchema);
exports.Order_list = mongoose.model("Order_list", order_listSchema);