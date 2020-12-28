const expressSession = require("express-session");
const requestJson = require("request-json");

module.exports = function attachHandlers(router) { //, passport) {
    // get requests
    router.get('/api/basketItems/Add/:productId', addItem);
    router.get('/api/basketItems/', list);
};

const list = ({session}, res) => {
    return res.json((session.products) ? session.products : {});
};

const addItem = ({params, session}, res) => {

    const {productId} = params;

    const client = requestJson.Client('http://127.0.0.1:5000/');

    client.get('api/products/' + productId, function(err, result, data) {
        if (err) {
            return res.send(500);
        }

        const productInfo = {
            "productId": data._id,
            "name": data.name,
            "price": data.offers.price
        };


        if (!session.products) {
            session.products = new Array();
        }
        session.products.push(productInfo);
        return res.send({
            ItemCount: session.products.length
        });

        //return console.log(body.rows[0].title);
    });

};