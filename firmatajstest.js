var Board = require("firmata");
var board = new Board("/dev/ttyACM0");

var DOTSTAR = 0x50;
var DOTSTAR_PIXEL=0x0;
var DOTSTAR_PIXEL_MAX = 30;
var DOTSTAR_SHOW = 0x1;
var DOTSTAR_CLEAR = 0x0;
var DOTSTAR_SETPIXEL = 0x2;


board.on('ready', function()

	//sysexCommand expects 7 bit arrays lsb first
	//- `Board.encode(data)`
	// data = ??????{
        // 
    board.sysexCommand([DOTSTAR]);
    board.sysexCommand([DOTSTAR,0x0]);
    board.sysexCommand([DOTSTAR,0x1]);
    board.sysexCommand([DOTSTAR,0x2,DOTSTAR_PIXEL,0xFFFFFF]);
    board.sysexCommand([DOTSTAR,0x1]);
    setInterval(function() {
    	board.sysexCommand([DOTSTAR,DOTSTAR_SETPIXEL,DOTSTAR_PIXEL++,0xFFFFFF]);
    	board.sysexCommand([DOTSTAR,DOTSTAR_SHOW]);
        if (DOTSTAR_PIXEL > DOTSTAR_PIXEL_MAX) {
	  DOTSTAR_PIXEL = 0;	
	} 
    },500);


  });
