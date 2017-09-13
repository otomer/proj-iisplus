var express = require("express");
var usersRouter = express.Router();
//var API = require("../../public/js/api");

var router = function () {

    usersRouter.route("/").get(function (request, response) {
        response.send("OK");
        // API.collections.users.get()
        //     .done(function (users) {
        //         if (users) {
        //             response.send(users[0]);
        //         } else {
        //             console.log("No users found");
        //             return null;
        //         }
        //     })
        //     .fail(function (e) {
        //         console.log("Failed to get users");
        //         response.send(e);
        //         return null;
        //     });
    })

    return usersRouter;
}

module.exports = router;