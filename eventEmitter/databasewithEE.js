// var http = require("http");
//     var server = http.createServer();
//     server.on("request", function (req, res) {
//         res.end("this is the response");
//     });
//     server.listen(3000);

//     var util         = require("util");
//     var EventEmitter = require("events").EventEmitter;



    var UserList = require("./userlist");
    var users = new UserList();
    users.on("saved-user", function (user) {
        console.log("saved: " + user.name + " (" + user.id + ")");
    });
    users.save({ name: "Jane Doe", occupation: "manager" });
    users.save({ name: "John Jacob", occupation: "developer" });