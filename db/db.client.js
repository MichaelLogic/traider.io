
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    BSON = mongo.BSONPure;

var ObjectId = mongo.ObjectID

exports.getDbClient = function() {
    return new MongoClient(new Server("127.0.0.1", 27017), {
        native_parser: true
    });
};

exports.dbHost = function() {
return "127.0.0.1:27017";
};

exports.dbName = function() {
    return "traider";
};

exports.makeObjectID = function(id) {
    //return new BSON.ObjectID(id);
    return new ObjectId(id);
};