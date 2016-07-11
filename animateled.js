var config = require('./config.js');
config.port = "/dev/cu.usbmodem1411";
var Board = require("firmata");
var board = new Board(config.port);
var repl = require('repl');

//var board = new Board({port: "COM15"});

var CK_COMMAND = 0x40;
var CK_PIXEL_SET = 0x10;
var CK_PIXEL_SHOW = 0x11;
var CK_PIXEL_CLEAR = 0x12;
var CK_PIXEL_BRIGHTNESS = 0x13;
var PIXEL = 1;
var PIXEL_MAX = 30;
var RED = 0;
var GREEN = 0;
var BLUE = 0;

repl.start('firmata>').context.board = board;

var packColor = function(red, green, blue) {
    red &= 0xFF;
    green &= 0xFF;
    blue &= 0xFF;
    var b1 = red >> 1;
    var b2 = ((red & 0x01) << 6) | (green >> 2);
    var b3 = ((green & 0x03) << 5) | (blue >> 3);
    var b4 = (blue & 0x07) << 4;
    var data = [b1, b2, b3, b4];
    console.log(data);
    return data;
};

board.on('ready', function() {
    console.log("START STRIP");
    // board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    // board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    // board.sysexCommand([CK_COMMAND]);

    setInterval(function() {
        board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, PIXEL++].concat(packColor(RED, GREEN, BLUE)));
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
        console.log(PIXEL);
        if (GREEN < 255) {
            GREEN++;
        }
        if (PIXEL > PIXEL_MAX) {
            PIXEL = 0;
        }
    }, 25);
});
