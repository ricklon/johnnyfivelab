const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const A0 = 0;
const board = new five.Board({
  port: config.get('port'),
});
let tSensor;

board.on('ready', function() {
  tSensor = new five.Thermometer({
    controller: 'TMP36',
    pin: A0,
    freq: 250,
    aref: 3.3,
  });

  tSensor.on('data', function() {
    logger.log('info', 'celsius: %d', this.C);
    logger.log('info', 'fahrenheit: %d', this.F);
    logger.log('info', 'kelvin: %d', this.K);
  });

  board.repl.inject({
    tmp36: tSensor,
  });
});
