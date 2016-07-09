var config = require('./config.js');
var five = require("johnny-five");
var board = new five.Board({port: config.port});
var PIN_LED1 = 1; //0
var PIN_BTN1 = 16; //16

board.on("ready", function() {
    var led = new five.Led(PIN_LED1);
    var ledAnalog = five.Led(2);
    var button = new five.Button({
        pin: PIN_BTN1,
        invert: true
    });

    board.repl.inject({
        button: button,
        led: led,
        ledAnalog: ledAnalog
    });

    // "down" the button is pressed
    button.on("down", function() {
        console.log("down");
    });

    // "hold" the button is pressed for specified time.
    //        defaults to 500ms (1/2 second)
    //        set
    button.on("hold", function() {
        console.log("hold");
    });

    // "up" the button is released
    button.on("up", function() {
        console.log("up");
    });

    led.blink(250);
    ledAnalog.fadeIn();

});
