var five = require("johnny-five"),
var board = new five.Board();

board.on("ready", function() {
  // Assuming a sensor is attached to pin "A1"
  this.pinMode(A0, five.Pin.ANALOG);
  this.analogRead(A0, function(value) {
    console.log(value);
  });
});


