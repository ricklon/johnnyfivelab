const config = require('config');
const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});
const ANALOG_PIN = 0;

board.on('ready', function() {
  // Assuming a sensor is attached to pin "A0"
  this.pinMode(ANALOG_PIN, five.Pin.ANALOG);
  this.analogRead(ANALOG_PIN, function(value) {
    let voltage = value * (3300 / 1024);
    let celsiusValue = (voltage - 500) / 10;
    let farenValue = celsiusValue * 9 / 5 + 32;
    console.log(`Analog: ${value}, C: ${celsiusValue.toPrecision(3)}, F: ${farenValue}`);
  });
});
