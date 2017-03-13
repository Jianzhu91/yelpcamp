//var mongoose = require("mongoose");
var Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, \
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, \
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. \
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]


function initDB() {
    Campground.remove({}, function(err) {
        // if (err) {
        //     console.log(err);
        // } else {
        //     console.log("Remove all the campgrounds...");
        //     // add the initial data for campgrounds
        //     data.forEach(function(campData) {
        //         Campground.create(campData, function(err, camp) {
        //             if (err) {
        //                 console.log(err);
        //             } else {
        //                 console.log("Add campground " + camp.name)
        //                 // add a comment
        //                 Comment.create({
        //                     text: "This place is great, but I wish there was internet",
        //                     author: "Kimi"
        //                 }, function(err, newComment) {
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         camp.comments.push(newComment);
        //                         camp.save();
        //                         console.log("Add new comment.");
        //                     }
        //                 });
        //             }
        //         });
        //     });
        // }
        if (err) {
            console.log(err);
        } else {
            console.log("Remove all the campgrounds...");
            // add the initial data for campgrounds
            User.findOne({"username": "jian"}, function(err, admin) {
                if (err) {
                    console.log(err);
                } else {
                    var author = {
                        id: admin._id,
                        username: admin.username
                    };
                    data.forEach(function(campData) {
                        Campground.create(campData, function(err, camp) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("Add campground " + camp.name)
                                // add a comment
                                Comment.create({
                                    text: "This place is great, but I wish there was internet",
                                    author: author
                                }, function(err, newComment) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        camp.comments.push(newComment);
                                        camp.author = author;
                                        camp.save();
                                        console.log("Add new comment.");
                                    }
                                });
                            }
                        });
                    });
                } // end of findOne err else
            });
        }
    });
}

module.exports = initDB;