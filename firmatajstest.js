var Board = require("firmata");
var board = new Board({port: "COM15"});


board.on('ready', function(){
    board.sysexCommand([0x50]);
  });
