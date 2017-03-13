var mongoose = require("mongoose");
var User  = require("./models/user");

function removeUsers() {
    User.remove({}, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("Remove all the users...");
        }
    });
}

module.exports = removeUsers;
