const log = console.log;

var events = require("events");

var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();
ee.on("someEvent", function () {
    console.log("event has occured");
});
ee.emit("someEvent");

let userObj = {
    name: "John",
}

ee.on("new-user", function (data, str, num) {
    data[str] = num;
    log(data);
});

ee.emit("new-user", userObj, "age", 19);
ee.setMaxListeners(20);

ee.on("someEvent", function () { console.log("event 1"); });
    ee.on("someEvent", function () { console.log("event 2"); });
    ee.on("someEvent", function () { console.log("event 3"); });
    ee.on("someEvent", function () { console.log("event 4"); });
    ee.on("someEvent", function () { console.log("event 5"); });
    ee.on("someEvent", function () { console.log("event 6"); });
    ee.on("someEvent", function () { console.log("event 7"); });
    ee.on("someEvent", function () { console.log("event 8"); });
    ee.on("someEvent", function () { console.log("event 9"); });
    ee.on("someEvent", function () { console.log("event 10"); });
    ee.on("someEvent", function () { console.log("event 11"); });
    ee.emit("someEvent");

    ee.once("firstConnection", () => { console.log("You'll never see this again"); });
    ee.emit("firstConnection");
    ee.emit("firstConnection");

    log(ee.listeners('someEvent'));

    function onlyOnce () {
        console.log(ee.listeners("firstConnection"));
        ee.removeListener("firstConnection", onlyOnce);
        console.log(ee.listeners("firstConnection"));
    }
    ee.on("firstConnection", onlyOnce) 
    ee.emit("firstConnection");
    ee.emit("firstConnection");

    ee.on("newListener", function (evtName, fn) {
        console.log("New Listener: " + evtName);
    });
    ee.on("removeListener", function (evtName) {
        console.log("Removed Listener: " + evtName);
    });
    function foo () {}
    ee.on("save-user", foo);
    ee.removeListener("save-user", foo);