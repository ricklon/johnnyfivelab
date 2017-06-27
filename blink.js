var five = require("johnny-five");
var board = new five.Board({port: "COM12"});
var PIN_LED1 = 1; //0

board.on("ready", function() {
  // Create an Led on pin 0
  var led = new five.Led(PIN_LED1);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
