/*
 * ledstrip.js
 * ledstrip sysex library
 */
var CK_COMMAND = 0x40;
var CK_PIXEL_SET = 0x10;
var CK_PIXEL_SHOW = 0x11;
var CK_PIXEL_CLEAR = 0x12;
var CK_PIXEL_BRIGHTNESS = 0x13;
var CK_PIXEL_ALERT_HIGH = 0x14;
var CK_PIXEL_ALERT_LOW = 0x15;

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
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SET, pixel].concat(packColor(red, green, blue)));
        console.log("ledstrip setPixelColor: r %d, g: %d, b:%d", red, green, blue);
    };
    Ledstrip.prototype.alertLOW = function() {
        board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_LOW]);
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
        console.log("ledstrip alert low");
    };
    Ledstrip.prototype.alertHIGH = function() {
        board.sysexCommand([CK_COMMAND, CK_PIXEL_ALERT_HIGH]);
        board.sysexCommand([CK_COMMAND, CK_PIXEL_SHOW]);
        console.log("ledstrip alert high");
    };
};
module.exports = Ledstrip;
