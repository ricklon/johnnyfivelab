var five = require("johnny-five");
var board = new five.Board({port: "COM15"});

board.on("ready", function() {
    // Assuming a sensor is attached to pin "A0"
    this.pinMode(0, five.Pin.ANALOG);
    this.analogRead(0, function(value) {
        var printValue = value * 330 / 1024;
        console.log("Temp: " + value + ": " + printValue.toPrecision(3));
    });
});
