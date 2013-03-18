
// Socket.io routines
module.exports = function (socket) {
    // Create the user object to handle a creation, delete and get users list
    var user = require('./user.js'),
        name = user.giveUserName();

    socket.emit('init', {
        name: name,
        users: user.getUsers()
    });
    // When user is logging in we give him the username he
    // requested iff it is not in use, else we tell him that the 
    // username is taken
    socket.on('change:name', function (data, fn) {
        if (user.createUser(data.name)) {
            var oldName = name;
            user.deleteUser(oldName);
            name = data.name;
            socket.broadcast.emit('change:name', {
                oldName: oldName,
                newName: name
            });
            fn(true);
        } else {
            fn(false);
        }
    });

    // If user disconnects from the app then we delete his username
    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name:name
        });
        user.deleteUser(name);
    });

    // On message sent we broadcast it to the other clients
    socket.on('send:message', function (data) {
        console.log(data);
        socket.broadcast.emit('send:message', {
            time: Date.now(),
            user: name,
            roomId: data.roomId,
            text: data.message,
        });
    });

    // Notify the other users in the chatroom that a user has joined
    socket.broadcast.emit('user:join', {
        name: name
    });
};
