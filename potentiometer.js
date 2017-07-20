const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const A2 = 4;
let board = new five.Board();
let potentiometer;

board.on('ready', function() {
  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: A2,
    freq: 250,
    threshold: 2,
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer,
  });

  // 'data' get the current reading from the potentiometer
  // potentiometer.on('data', function(data) {
  //  logger.log('info', `${data}, ${this.raw}`);
  // });
  potentiometer.on("change", function() {
    logger.log('info', this.value);
  });
});
