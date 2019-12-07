//node --experimental-modules
const  mongoose = require('mongoose');

userSchema = new mongoose.Schema({
    email: String,
    password: String
});

ratingSchema = new mongoose.Schema({
    author: String,
    content: String
});

exports.User = new mongoose.model("User", userSchema);
exports.Rating = new mongoose.model("Rating", ratingSchema);

