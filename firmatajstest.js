var Board = require("firmata");
var board = new Board("/dev/cu.usbmodem1411");


board.on('ready', function(){
    board.sysexCommand([0x50]);
  });
