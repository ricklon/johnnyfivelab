var config = require('./config.js');
var five = require("johnny-five");
var board = new five.Board({
    port: config.port
});

board.on("ready", function() {
    // Assuming a sensor is attached to pin "A0"
    this.pinMode(0, five.Pin.ANALOG);
    this.analogRead(0, function(value) {
        var celsiusValue = value * 330 / 1024;
        var farenValue = celsiusValue * 9 / 5 + 32;
        console.log("Analog: " + value + " , C: " + celsiusValue.toPrecision(3) + ", F: " + farenValue);
    });
});
