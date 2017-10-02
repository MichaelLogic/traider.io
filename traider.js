var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')({
    session: expressSession
});


createServer = function createServer() {

    var server = express();
    // specify middleware 
    //server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'bb3hyts-hush3pupp13-hu343-897',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            db: 'traiderioSessions'
        })
    }));


    // attach router handlers
    routes.attachHandlers(server); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});