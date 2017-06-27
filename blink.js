var config = require('config');
var five = require("johnny-five");
var board = new five.Board({port: config.get('port')});
var PIN_LED1 = 1; // Fubarino_mini pin 1

board.on("ready", function() {
  // Create an Led on LED_PIN
  var led = new five.Led(PIN_LED1);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
