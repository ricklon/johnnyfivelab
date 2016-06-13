var five = require("johnny-five");
var board = new five.Board();
var led;

board.on("ready", function() {
  // Create an Led on pin 0
  led = new five.Led(0);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
