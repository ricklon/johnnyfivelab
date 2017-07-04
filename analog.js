const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});
const A2 = 4;  // Manually map A2 to pin 4

board.on('ready', function () {
  this.analogRead(A2, function (value) {
    logger.log('info', value);
  });
});
