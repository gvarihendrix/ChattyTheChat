'use strict';

/* Controllers */
function AppCtrl($scope, $http, socket) {
  // Socket listeners
  // ================
  $scope.messages = [];

  socket.on('init', function (data) {
    $scope.name = data.name;
    $scope.users = data.users;
  });

  socket.on('send:message', function (message) {
    $scope.messages.push(message);
  });


  socket.on('change:name', function (data) {
    changeName(data.oldName, data.newName);
  });
  /**
   * Alert other chatroom users that a new user has joined
   * @param  {Object data} data) {      
   * @return nothing    
   */
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
  socket.on('user:left', function (data) {
    $scope.messages.push({
        user: 'chatroom',
        text: 'User' + data.name + ' has left.'
    });

    var i, user;
    for (i = 0; i < $scope.users.length; i += 1) {
        user = $scope.users[i];
        if (user === data.name) {
            $scope.users.splice(i, 1);
            break;
        }
    }
  });

  // Private helper function
  // ========================

  var changeName = function (oldName, newName) {
    // rename user in list of users
    for (var i = 0; i < $scope.users.length; i += 1) {
        if ($scope.users[i] === oldName) {
            $scope.users[i] = newName;
        }
     }

     $scope.messages.push({
        user: 'chatroom',
        text: 'User ' + oldName + 'is now known as ' + newName + '.'
     });
  };

  // Methods puplished to the scope
  // ==============================

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

  $scope.sendMessage = function () {
    socket.emit('send:message', {
        message: $scope.message
    });
    // add the message to our model locally
    $scope.messages.push({
        user: $scope.name,
        text: $scope.message
    });

    // clear message box
    $scope.message = '';
  };
}


function MyCtrl2() {
}
MyCtrl2.$inject = [];
