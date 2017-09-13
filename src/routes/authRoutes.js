var express = require("express");
var authRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var API = require("../../public/js/api");


var router = function (nav) {
    authRouter.route("/:id").get(function (request, response) {
        var id = request.params.id;
        response.render('userView', {
            title: "Users",
            users: null,
            nav: nav
        });
    })

    authRouter.route("/").get(function (request, response) {
        mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
            if (err) {
                //console.log(err);
                response.send(JSON.stringify(err));
            } else {
                var collection = db.collection('groups');
                collection.find({}).toArray(function (err, results) {
                    response.render('groupsListView', {
                        title: "Groups",
                        groups: results,
                        hourTheme: getThemeClass(),
                        nav: nav
                    });
                    db.close();
                })
            }
        });
    })

    return authRouter;
}

module.exports = router;