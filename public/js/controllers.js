'use strict';

/* Controllers */
function AppCtrl($scope, $http, socket) {
    var i, changeName;
    // Socket listeners
    // ================
    $scope.test = [1,2,3];
    $scope.channels = [ {
        id       : 1,
        name     : "Dynamic Title 1",
        topic    : "Dynamic content 1",
        messages : [],
        postText : ''
    },
    {
        id    : 2,
        name  : "Dynamic Title 2",
        topic : "Dynamic content 2",
        messages : [],
        postText : ''
    }];


    // Private helper function
    // ========================
/*
    changeName = function (oldName, newName) {
        // rename user in list of users
        for (i = 0; i < $scope.users.length; i = i + 1) {
            if ($scope.users[i] === oldName) {
                $scope.users[i] = newName;
            }
        }

        $scope.messages.push({
            user: 'chatroom',
            text: 'User ' + oldName + 'is now known as ' + newName + '.'
        });
    };
*/

    $scope.closeRoom = function (index) {
        $scope.channels.splice(0, 1);
    };

    socket.on('init', function (data) {
        $scope.name = data.name;
        $scope.users = data.users;
    });

    socket.on('send:message', function (message) {
        for (i = $scope.channels.length - 1; i >= 0; i = i - 1) {
            if ($scope.channels[i].id === message.roomId) {
                $scope.channels[i].messages.push({
                    time: message.time,
                    user: message.user,
                    text: message.text
                });
                break;
            }
        }
    });

/*
    socket.on('change:name', function (data) {
        changeName(data.oldName, data.newName);
    });
    /**
     * Alert other chatroom users that a new user has joined
     * @param  {Object data} data) {      
     * @return nothing    
     */
 /*
    socket.on('user:join', function (data) {
        $scope.messages.push({
            user: 'chatroom',
            text: 'User' + data.name + ' has joined.'
        });
        $scope.users.push(data.name);
    });

    /**
     * When a user leaves the chatroom take care of removing him
     * @param  {Data object} data)    
     * @return nothing
     */
 /*
    socket.on('user:left', function (data) {
        var user;
        $scope.messages.push({
            user: 'chatroom',
            text: 'User' + data.name + ' has left.'
        });

        for (i = 0; i < $scope.users.length; i += 1) {
            user = $scope.users[i];
            if (user === data.name) {
                $scope.users.splice(i, 1);
                break;
            }
        }
    });
*/
    // Methods puplished to the scope
    // ==============================
/*
    $scope.changeName = function () {
        socket.emit('change:name', {
            name: $scope.newName
        }, function (result) {
            if (!result) {
                window.alert('There was an error changing your name');
            } else {
                changeName($scope.name, $scope.newName);

                $scope.name = $scope.newName;
                $scope.newName = '';
            }
        });
    };
*/
    $scope.sendMessage = function (index) {
        socket.emit('send:message', {
            message: $scope.channels[index].postText,
            roomId: $scope.channels[index].id
        });

        // add the message to our model locally
        $scope.channels[index].messages.push({
            time: Date.now(),
            user: $scope.name,
            text: $scope.channels[index].postText
        });

        // Clear message box
        $scope.channels[index].postText = '';

    };

    socket.on('send:name', function (data) {
        $scope.name = data.name;
    });


}


function MyCtrl2() {
}
MyCtrl2.$inject = [];
