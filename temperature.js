const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});
const ANALOG_PIN = 0;

board.on('ready', function() {
  // Assuming a sensor is attached to pin "A0"
  this.analogRead(ANALOG_PIN, function(value) {
    const voltage = value * (3300 / 1024);
    const celsiusValue = (voltage - 500) / 10;
    const farenValue = (celsiusValue * (9 / 5)) + 32;
    logger.log('info', `Analog: ${value}, C: ${celsiusValue.toPrecision(3)}, F: ${farenValue}`);
  });
});
