var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//This adds some methods to our user
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);