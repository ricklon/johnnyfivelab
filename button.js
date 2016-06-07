var five = require("johnny-five"),board,button;
var board = new five.Board();

board.on("ready", function() {
  var ledAnalog = five.Led(1);

  var button = new five.Button({
          pin: 16,
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

  led.blink(250);
//  ledAnalog.fadeIn();

});
