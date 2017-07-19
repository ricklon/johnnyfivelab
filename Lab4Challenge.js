const config = require('config');
const logger = require('winston');
const five = require('johnny-five');
const Ledstrip = require('./ledstrip.js');

const board = new five.Board();
const ledstrip = new Ledstrip(board);

// board settings
const A2 = 4;
const PIN_LED1 = 1; // 1
const PIN_BTN1 = 16; // 16
const MAX_PIXELS = 30;

let potentiometer;

board.on('ready', function() {
  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: A2,
    freq: 250,
    threshold: 2,
  });

  //ligt up when ready
  for (let ii = 0; ii < MAX_PIXELS; ii += 1) {
    ledstrip.setPixelColor(ii, rand(0, 255), rand(0, 255), rand(0, 255));
  }
  ledstrip.show();
  potentiometer.on("change", function() {
    logger.log('info', this.value);
    // on change update animated pixels
    // use ledstrip functions here
  });
});

function rand(min, max) {
  let num = Math.floor(Math.random() * max) + min;
  return num;
}
