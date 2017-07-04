const config = require('config');
const five = require('johnny-five');

const board = new five.Board({ port: config.get('port') });
const PIN_LED1 = 1; // Fubarino_mini pin 1

board.on('ready', function() {
  // Create an Led on LED_PIN
  const led = new five.Led(PIN_LED1);
  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
