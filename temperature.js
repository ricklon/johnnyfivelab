var config = require("config");
var five = require("johnny-five");
var board = new five.Board({
    port: config.get('port')
});

board.on("ready", function() {
    // Assuming a sensor is attached to pin "A0"
    this.pinMode(0, five.Pin.ANALOG);
    this.analogRead(0, function(value) {
        var voltage = value * (3300 / 1024);
        var celsiusValue = (voltage - 500) / 10;
        var farenValue = celsiusValue * 9 / 5 + 32;
        console.log("Analog: " + value + " , C: " + celsiusValue.toPrecision(3) + ", F: " + farenValue);
    });
});
