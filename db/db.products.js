var mongoHandler = require("./db.client.js");
var collectionName = "products";


exports.getById = function(id, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;
    console.log(uri);

    mongoclient.connect(uri,function(err, db) {
       
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            //mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });
    });
};

exports.getAll = function(callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;
    console.log(uri);

    mongoclient.connect(uri,function(err, db) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else {
                result.toArray(function(err, resultArray) {
                    //Close the connection
                    //mongoclient.close();

                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });
    });
};


exports.insert = function(data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    var dbHost = mongoHandler.dbHost();
    var dbName = mongoHandler.dbName();
    var uri = "mongodb://" + dbHost + "/" + dbName;
    console.log(uri);
    //var db = mongoclient.db(dbName);
    //console.log(dbName + "." + collectionName);
    mongoclient.connect(uri,function(err,db){

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }else{
            db.collection(collectionName).insert(data, function(err, result) {
                if (err) {
                    mongoclient.close();
                    throw err.Message;
                    return;
                } else if (callback === null && typeof(callback) !== "function") {
                    mongoclient.close();
                    return callback(result);
                }
            });
        }


    });
    
};