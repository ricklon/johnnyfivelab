/*
* ledstrip.js
* ledstrip sysex library
*/
var CK_COMMAND = 0x40;
var CK_PIXEL_SET = 0x10;
var CK_PIXEL_SHOW = 0x11;
var CK_PIXEL_CLEAR = 0x12;
var CK_PIXEL_BRIGHTNESS =  0x13;

Ledstrip = function(board) {
  this.board = board;

/*
* Configure sysex access to led strip.
*/


Ledstrip.prototype.hello = function() {
  board.sysexCommand([CK_COMMAND]);
  console.log("ledstrip hello");
};
Ledstrip.prototype.clear = function() {
  board.sysexCommand([CK_COMMAND, CK_PIXEL_CLEAR]);
  console.log("ledstrip clear");
};
Ledstrip.prototype.show = function() {
  board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
  console.log("ledstrip show");
};
Ledstrip.prototype.setPixelColor = function(pixel, red, green, blue) {
  board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel, 0x7F, red, green, blue]);
  console.log("ledstrip setPixelColor: r %d, g: %d, b:%d",red, green, blue);
};
};
module.exports = Ledstrip;
