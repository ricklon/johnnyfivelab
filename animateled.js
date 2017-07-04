const config = require('config');
const logger = require('winston');
const Board = require('firmata');
const repl = require('repl');

const port = config.get('port');
const board = new Board(port);

logger.log('info', `port: ${port}`);

const CK_COMMAND = 0x40;
const CK_PIXEL_SET = 0x10;
const CK_PIXEL_SHOW = 0x11;
const CK_PIXEL_CLEAR = 0x12;
const CK_PIXEL_BRIGHTNESS = 0x13;
let PIXEL = 1;
const PIXEL_MAX = 30;
let RED = 0;
let GREEN = 0;
let BLUE = 0;

repl.start('firmata>').context.board = board;

const packColor = function(red, green, blue) {
  red &= 0xFF;
  green &= 0xFF;
  blue &= 0xFF;
  const b1 = red >> 1;
  const b2 = ((red & 0x01) << 6) | (green >> 2);
  const b3 = ((green & 0x03) << 5) | (blue >> 3);
  const b4 = (blue & 0x07) << 4;
  const data = [b1, b2, b3, b4];
  logger.log('info', data);
  return data;
};

board.on('ready', function() {
  logger.log('info', 'START STRIP');
  // board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
  // board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
  // board.sysexCommand([CK_COMMAND]);

  setInterval(function() {
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, PIXEL++].concat(packColor(RED, GREEN, BLUE)));
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    logger.log('info', PIXEL);
    if (GREEN < 255) {
      GREEN++;
    }
    if (PIXEL > PIXEL_MAX) {
      PIXEL = 0;
    }
  }, 25);
});
