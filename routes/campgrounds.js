var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campground"),
    middleware  = require("../middleware");


// INDEX -- show all campgrounds from DB
router.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, allCamps) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/campgrounds", {campgrounds: allCamps});
        }
    });
});


// CREATE -- create a new campground
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    // parse data from the form
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: image, description: desc, autour: author};
    // add new camp to the campgrounds and redirect
    Campground.create(newCamp, function(err, newCG) {
        if (err) {
            console.log(err);
        } else {
            console.log("SUCCESSFULLY CREATE NEW CAMPGROUND...");
            console.log(newCG.name);
            res.redirect("campgrounds/campgrounds");
        }
    });
});


// NEW 
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});


// SHOW
router.get("/campgrounds/:id", function(req, res) {
    // get the id from the url
    Campground.findById(req.params.id).populate("comments").exec(function(err, camp) {
        if (err) {
            console.log(err);
        } else {
            // redirect to the show page
            res.render("campgrounds/show", {campground: camp});
        }
    });
});


// EDIT route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: campground});
        }
        
    });
    
});


//UPDATE route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCG) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


// DELETE route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        }
        req.flash("success", "Successfully delete campground");
        res.redirect("/campgrounds");
    });
});



module.exports = router;