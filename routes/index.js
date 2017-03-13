var express     = require("express"),
    router      = express.Router(),
    User        = require("../models/user"),
    passport    = require("passport");
    

// home page route
router.get("/", function(req, res) {
    res.render("home");
});



// Authentication routes
//================================================
// show register page
router.get("/register", function(req, res) {
    res.render("register");
});

// handle register logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Welcome to YelpCamp " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});


// show login page
router.get("/login", function(req, res) {
    res.render("login");
});


// handle login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }),
    function(req, res){}
);

// logout logic
router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success", "You have logged out the website!");
    res.redirect("/campgrounds");
});


module.exports = router;