var db = require("../db/db.products.js");

// define the routes for /api/users
module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/products/seed', seed);
    router.get('/api/products', list);
    router.get('/api/products/:id', view);
};


function list(req, res) {
    db.getAll(function(data) {
        res.json(data);
    });
}

function seed(req, res) {
    db.insert({
        "name": "Horse",
        "description": "A lovely horse",
        "minPrice": 59.99,
        "offers": {
            "price": 59.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "Cow",
        "description": "A lovely cow",
        "minPrice": 59.99,
        "offers": {
            "price": 59.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "cat",
        "description": "A lovely cat",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "dog",
        "description": "A lovely dog",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    db.insert({
        "name": "mouse",
        "description": "A lovely mouse",
        "minPrice": 19.99,
        "offers": {
            "price": 19.99,
            "stock": 10
        }
    });
    res.json({
        "Status": "OK"
    });
}

function view(req, res) {
    db.getById(req.params.id, function(err, data) {
        if (err) {
            console.log(err);
            res.statusCode = 500;
            return res.json({
                "Error": err
            });
        } else {
            return res.json(data);
        }
    });
}