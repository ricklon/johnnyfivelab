const config = require('config');
const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});
const A0 = 4;  // The analogRead() funciton doesn't support the A0 default

board.on('ready', function () {
  // Assuming a sensor is attached to pin "A1"
  this.pinMode(A0, five.Pin.ANALOG);
  this.analogRead(A0, function (value) {
    console.log(value);
  });
});
