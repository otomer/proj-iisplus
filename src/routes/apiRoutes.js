var express = require("express");
var apiRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var API = require("../../public/js/api");

var router = function () {

    apiRouter.route("/info/:user?")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {

                    db.collection('users').find({}).toArray(function (err, results) {
                        var item = results[0];

                        if (request.params && request.params.user) {
                            var user = request.params.user;

                            if (item.users.indexOf(user) !== -1) {
                                //user already exists.
                            }
                            else {
                                item.users.push(user);
                                db.collection('users').updateOne(
                                    { '_id': item._id },
                                    { $set: { 'users': item.users } },
                                    { upsert: true });
                                // ,
                                // function (err, results) {
                                //     response.send(item);
                                //     db.close();
                                // })
                            }
                        } else {
                            //No user param
                        }

                        response.send(item);
                        db.close();
                    })
                }
            });
        })

    apiRouter.route("/tfscop/:user?")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {

                    db.collection('tfscop').find({}).toArray(function (err, results) {
                        var item = results[0];

                        if (request.params && request.params.user) {
                            var user = request.params.user;

                            if (item.users.indexOf(user) !== -1) {
                                //user already exists.
                            }
                            else {
                                item.users.push(user);
                                db.collection('tfscop').updateOne(
                                    { '_id': item._id },
                                    { $set: { 'users': item.users } },
                                    { upsert: true });
                                // ,
                                // function (err, results) {
                                //     response.send(item);
                                //     db.close();
                                // })
                            }
                        } else {
                            //No user param
                        }

                        response.send(item);
                        db.close();
                    })
                }
            });
        })
    return apiRouter;
}

module.exports = router;