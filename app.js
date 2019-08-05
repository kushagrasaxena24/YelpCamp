var express= require("express"),
	app= express(),
    bodyParser= require("body-parser"),
	mongoose=require("mongoose"),
	flash       = require("connect-flash"),
	passport= require("passport"),
	LocalStrategy = require("passport-local"),
	Campground=require("./models/campground"),
	Comment= require("./models/comment"),
	methodOverride=require("method-override");
	User        = require("./models/user");

//	seedDB= require("./seeds");

mongoose.connect("mongodb+srv://kushagrasaxena:kushagrasaxena24@cluster0-b38ow.mongodb.net/test?retryWrites=true&w=majority",{
	useNewUrlParser: true,
	useCreateIndex: true	
}).then(() => {
	console.log("Connected to DB");
}).catch(err => {
	console.log("Error", err.message);
});

//requring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");

// mongoose.connect("mongodb://localhost:27017/yelp-camp",{
// 	useNewUrlParser: true
// });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Configuration

app.use(require("express-session")({
    secret: "yelpcamp is awesome!! ",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");	
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
	console.log("YelpCamp server has started");
});