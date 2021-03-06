
/**
 * Module dependencies.
 */

var express = require('express'),
    app =  module.exports = express(),
    server = require('http').createServer(app),
    routes = require('./routes'),
    io = require('socket.io').listen(server),
    socket = require('./routes/socket.js'),
    api = require('./routes/api');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(express.session({secret:'secret', key:'express.sid'}));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes hello

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
app.get('/about',routes.about);


// JSON API

app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*',routes.index);


// Socket io communication
io.sockets.on('connection', socket);


// Start server
server.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
