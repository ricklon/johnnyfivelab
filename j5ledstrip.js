var config = require("config");
var five = require("johnny-five");
var board = new five.Board({
  port: config.get('port')
});

var button;
var btnStatus;
var PIN_LED1 = 1; //1
var PIN_BTN1 = 16; //16

var Ledstrip = require("./ledstrip.js");
var ledstrip = new Ledstrip(board);

var pixels = 30;
var pixel_cur = 0;

board.on("ready", function(socket) {
  ledstrip.hello();
  ledstrip.clear();
  ledstrip.show();
  ledstrip.setPixelColor();
  ledstrip.hello();
  led = new five.Led(PIN_LED1);
  led.on();

  button = new five.Button({
    pin: PIN_BTN1,
    invert: true
  });

  button.on("down", function() {
    btnStatus = "down";
    led.on();
    ledstrip.setPixelColor(pixel_cur++, 255, 0, 0);
    ledstrip.show();
    if (pixel_cur >= 30) {
      pixel_cur = 0;
      ledstrip.clear();
    }
    console.log("down");
  });

});
