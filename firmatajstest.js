var Board = require("firmata");
var board = new Board("/dev/ttyACM0");
var    repl = require('repl');

//var board = new Board({port: "COM15"});

var CK_COMMAND = 0x40;
var CK_PIXEL_SET = 0x10;
var CK_PIXEL_SHOW = 0x11;
var CK_PIXEL_CLEAR = 0x12;
var CK_PIXEL_BRIGHTNESS =  0x13;
var PIXEL = 1;
var PIXEL_MAX = 30;

repl.start('firmata>').context.board = board;


board.on('ready', function(){

    console.log("START");
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,0, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,1, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,2, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,3, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,4, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,7, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,8, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,9, 0x7F, 0xFF, 0xFF, 0xFF]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,14, 0x7F, 255,255,255]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,15, 0x7F, 255,0,255]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,16, 0x7F, 255,255,0]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,17, 0x7F, 0,1,255]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);

    setInterval(function() {
      board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
      board.sysexCommand([CK_COMMAND,CK_PIXEL_SHOW]);
      board.sysexCommand([CK_COMMAND,CK_PIXEL_SET,PIXEL++,0x7F, 0,128, 128]);
      board.sysexCommand([CK_COMMAND,CK_PIXEL_SHOW]);
      console.log(PIXEL);
      if (PIXEL > PIXEL_MAX) {
	        PIXEL = 0;
	    }
},250);


});
