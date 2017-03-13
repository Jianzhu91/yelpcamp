// All the middleware
var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment");
    
var middlewareObj = {};

// check the ownership of comment
middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    console.log("You have no rights to edit thiscomment!!");
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login the website first");
        res.redirect("back");
    }
}

// check the ownership of campground
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCG) {
            if (err) {
                console.log(err);
                res.redirect("back");
            } else {
                if (foundCG.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You need to login the website first");
        res.redirect("back");
    }
}

// check login middleware
middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please loggin first!");
    res.redirect("/login");
}

module.exports = middlewareObj;