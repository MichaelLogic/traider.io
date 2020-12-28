
const {MongoClient, ObjectID} = require("mongodb");


exports = {
    getDbClient : () => new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true }),
    dbHost : () => "127.0.0.1:27017",
    dbName : () => "traider",
    makeObjectID : () => new ObjectID(id)
}

// exports.getDbClient = function() {
//     return new MongoClient("mongodb://localhost:27017", { useNewUrlParser: true, useUnifiedTopology: true });
// };

// exports.dbHost = function() {
// return "127.0.0.1:27017";
// };

// exports.dbName = function() {
//     return "traider";
// };

// exports.makeObjectID = function(id) {
//     //return new BSON.ObjectID(id);
//     return new ObjectID(id);
// };