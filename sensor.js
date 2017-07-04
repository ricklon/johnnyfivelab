const config = require('config');
const five = require('johnny-five');

const A0 = 0;
const board = new five.Board({
  port: config.get('port'),
});

board.on('ready', function() {
  // Create a new generic  temperature sensor instance for
  // a sensor connected to an analog (ADC) pin
  const temp = new five.Sensor({
    pin: A0,
    freq: 250,
    threshold: 5,
  });

  // When the sensor value changes, log the value
  temp.on('change', function(value) {
    const voltage = value * (3300 / 1024);
    const celsiusValue = (voltage - 500) / 10;
    const farenValue = (celsiusValue * (9 / 5)) + 32;
    console.log(`Analog: ${value}, C: ${celsiusValue.toPrecision(3)}, F: ${farenValue}`);
  });
});
