

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

app.factory('socket', function ($rootScope) {
    var socket = io.connect();
    // Used this pattern from http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/
    // doing some factory style coding in javascript, its just to encapsulate the socket object
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply( function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});