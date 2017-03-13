var express             = require("express"),
    app                 = express(),
    flash               = require("connect-flash"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    localStrategy       = require("passport-local"),
    User                = require("./models/user"),
    initDB              = require("./init"),
    methodOverride      = require("method-override"),
    removeUsers         = require("./removeUsers");
  
// import all the routers 
var indexRoutes = require("./routes/index"),
    campgoundRoutes = require("./routes/campgrounds"),
    commentRoute = require("./routes/comments");


app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(flash());
app.set("view engine", "ejs");
mongoose.connect("mongodb://localhost/yelp_camp");
initDB();
// Remove all the users if needed
// removeUsers();


// Passport configuration
app.use(require("express-session")({
    secret: "This is Kimi's web app for authentication",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// middleware for navbar display
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


// Setup all the routes
app.use(indexRoutes);
app.use(campgoundRoutes);
app.use(commentRoute);


app.listen(process.env.PORT, process.env.IP, function() {
   console.log("Server YelpCamp has started..."); 
});