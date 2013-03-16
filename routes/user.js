// Each user in the app needs to have a unique usernamodeme
module.exports  =  (function User(){
    var _usernames = {}; // Create and object of usernames

    var createUser = function(username) {
        // If username is undefined or its set
        // then it is false else its true
        if (!isUserSet(username)){
            _usernames[username] = true;
            return true;
        } else {
            return false;
        }

    };

    // Create a list of users
    var getUsers = function () {
        var list_of_users = [];
        for (var user in _usernames) {
            list_of_users.push(user);
        }
        return list_of_users;
    };

    // Delete a user
    var deleteUser = function(username) {
        // If 
        if (isUserSet(username)) {
            delete _usernames[username];
        }
    };

    function isUserSet(username) {
        // If username is undefined or any of the values that javascript
        // returns as false or has the _username object with this username
        // not been set then we return false
        return !username || _usernames[username];
    }


    return {
        createUser: createUser,
        getUsers: getUsers,
        deleteUser: deleteUser
    };
})(); // This will call this function when the server is started
