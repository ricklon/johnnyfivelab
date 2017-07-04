const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const board = new five.Board({
  //port: config.get('port'),
});
const PIN_LED1 = 1; // Fubarino_mini pin 1

logger.log('info', 'johhnyfive: start');


board.on('ready', function() {
  //Create an Led on LED_PIN
  const led = new five.Led(PIN_LED1);
  // Strobe the pin on/off, defaults to 100ms phases
  led.on();

  board.on('exit', function() {
    led.off();
    logger.log('info', 'Board exit')
  });
  board.repl.inject({
    led: led,
  });
});

board.on('close', function() {
  logger.log('info', 'Board closed')
});
board.on('fail', function(event) {
  logger.log('error', "%s sent a 'fail' message: %s", event.class, event.message);
});
logger.log('info', 'johhnyfive: end');
