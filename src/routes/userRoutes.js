var express = require("express");
var usersRouter = express.Router();
var API = require("../../public/js/api");

var router = function (nav) {
    var users = [
        {
            title: "A",
            genre: "B",
            author: "C",
            read: false
        }
    ]
 

    usersRouter.route("/").get(function (request, response) {
        response.send('Users');
        // API.collections.users.get()
        //     .done(function (users) {
        //         if (users) {
        //             response.render('usersListView', {
        //                 title: "Users",
        //                 users: users,
        //                 nav: nav
        //             });
        //         }
        //         else { return null; }
        //     })
        //     .fail(function () {
        //         return null;
        //     });
    })

    return usersRouter;
}

module.exports = router;