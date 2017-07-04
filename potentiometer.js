const config = require('config');
const five = require('johnny-five');

const A2 = 4;
const board = new five.Board({
  port: config.get('port'),
});

board.on('ready', function() {
  // Create a new generic  temperature sensor instance for
  // a sensor connected to an analog (ADC) pin
  const tempSensor = new five.Sensor({
    pin: A2, // sensor pin number
    freq: 250,
    threshold: 5,
  });

  // When the sensor value changes, log the value
  tempSensor.on('change', function(value) {
    console.log(`sensor: ${value}`);
  });
});
