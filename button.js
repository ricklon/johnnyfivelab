var five = require("johnny-five");

var board = new five.Board();
var PIN_LED1 = 21;
var PIN_BTN1 = 23;

board.on("ready", function() {

    var button = new five.Button({
        pin: PIN_BTN1,
        invert: true
    });

    board.repl.inject({
        button: button
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

});
