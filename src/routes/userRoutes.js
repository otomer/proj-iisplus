var express = require("express");
var usersRouter = express.Router();
var mongodb = require("mongodb").MongoClient;
var API = require("../../public/js/api");

var router = function () {

    usersRouter.route("/info")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                if (err) {
                    response.send(JSON.stringify(err));
                } else {
                    db.collection('users').find({}).toArray(function (err, results) {
                        response.send(results[0]);
                        db.close();
                    })
                }
            });
        })

    usersRouter.route("/add")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                try {
                    if (err) {
                        response.send(JSON.stringify(err));
                    } else {
                        db.collection('users').find({}).toArray(function (err, results) {
                            var item = results[0];
                            item.connectedUsers += 1;

                            db.collection('users').updateOne(
                                {
                                    '_id': item._id
                                },
                                {
                                    $set: {
                                        'connectedUsers': item.connectedUsers
                                    }
                                },
                                { upsert: true },
                                function (err, results) {
                                    response.send(results);
                                    db.close();
                                })

                        })


                        // response.send("OK");
                    }
                } catch (ex) {
                    console.log('ex');
                    response.send(JSON.stringify(ex));
                }
            });
        })

    usersRouter.route("/remove")
        .get(function (request, response) {
            mongodb.connect(API.dbInfo.getConnectionString(), function (err, db) {
                try {
                    if (err) {
                        response.send(JSON.stringify(err));
                    } else {
                        db.collection('users').find({}).toArray(function (err, results) {
                            var item = results[0];
                            item.connectedUsers -= 1;

                            db.collection('users').updateOne(
                                {
                                    '_id': item._id
                                },
                                {
                                    $set: {
                                        'connectedUsers': item.connectedUsers
                                    }
                                },
                                { upsert: true },
                                function (err, results) {
                                    response.send(results);
                                    db.close();
                                })

                        })


                        // response.send("OK");
                    }
                } catch (ex) {
                    console.log('ex');
                    response.send(JSON.stringify(ex));
                }
            });
        })

    return usersRouter;
}

module.exports = router;