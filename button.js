const config = require('config');
const logger = require('winston');
const five = require('johnny-five');
const board = new five.Board({
  port: config.get('port'),
});
const PIN_BTN1 = 16;

board.on('ready', function() {
  const button = new five.Button({
    pin: PIN_BTN1,
    invert: true,
  });
  // Make button accessible from the command line
  board.repl.inject({ button, button });
  // 'down' event the button is pressed
  button.on('down', function() {
    logger.log('info', 'down');
  });
  // 'hold' event the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  button.on('hold', function() {
    logger.log('info', 'hold');
  });
  // 'up' event the button is released
  button.on('up', function() {
    logger.log('info', 'up');
  });
});
