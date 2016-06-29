var Board = require("firmata");
var board = new Board("/dev/ttyACM0");
var    repl = require('repl');

//var board = new Board({port: "COM15"});

var CK_COMMAND = 0x40;
var CK_PIXEL_SET = 0x10;
var CK_PIXEL_SHOW = 0x11;
var CK_PIXEL_CLEAR = 0x12;
var CK_PIXEL_BRIGHTNESS =  0x13;


repl.start('firmata>').context.board = board;


board.on('ready', function(){

	//sysexCommand expects 7 bit arrays lsb first
	//- `Board.encode(data)`
	// data = ??????{
        //
    //mm = Board.encode([0x50,0x12]);
    console.log("STAR");
    //dotstar_cmd = Board.encode([80]);
    //console.log("dotstar_cmd: ", dotstar_cmd);
    //board.sysexCommand(dotstar_cmd);
    //board.sysexCommand(mm);
    board.sysexCommand([CK_COMMAND]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
    //board.sysexCommand([DOTSTAR,DOTSTAR_CLEAR]);
    board.sysexCommand([CK_COMMAND]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SET,0x02, 0x5F, 0x67, 0x70]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
    board.sysexCommand([0x40,0x10,0x03,0x7F,0x5F,0x67,0x70]);
    board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);

    //board.sysexCommand([DOTSTAR,DOTSTAR_SHOW]);
/*
    setInterval(function() {
    	board.sysexCommand(Board.encode([DOTSTAR,DOTSTAR_SETPIXEL,DOTSTAR_PIXEL++,0xFFFFFF]));
    	board.sysexCommand(Board.encode([DOTSTAR,DOTSTAR_SHOW]));
        if (DOTSTAR_PIXEL > DOTSTAR_PIXEL_MAX) {
	  DOTSTAR_PIXEL = 0;
	}
    },500);
*/

});
