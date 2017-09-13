var express = require("express");
var apiRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var API = require("../../public/js/api");
var shortid = require('shortid');

var router = function (nav) {

    apiRouter.route("/groups")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {
                    db.collection('groups').find({}).toArray(function (err, results) {
                        response.send(results);
                        db.close();
                    })
                }
            });
        })

    apiRouter.route("/groups/add")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {
                    db.collection('groups').insertMany([{
                        createDate: new Date(),
                        creator: "a@a.a",
                        name: "Liveperson",
                        code: shortid.generate(),
                        subscribers: []
                    }], function (err, results) {
                        response.send(results);
                        db.close();
                    })
                }
            });
        });

    apiRouter.route("/groups/clear")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {
                    db.collection('groups').remove(function (err, results) {
                        response.send(results);
                        db.close();
                    })
                }
            });
        });

    apiRouter.route("/")
        .get(function (request, response) {
            response.render('apiListView', {
                title: "Api",
                apiLinks: [
                    { url: '/api/groups' },
                    { url: '/api/groups/clear' },
                    { url: '/api/groups/add' }
                ],
                nav: nav
            });
        }),

        

    return apiRouter;
}

module.exports = router;