/*

This fails to convert the 3.3v logic instead of the 5v logic.
THis can be a problem of assumptions of the devices.

*/
var config = require('config');
var five = require("johnny-five");
var board = new five.Board({port: config.get('port')});


board.on("ready", function() {

   let temperature = new five.Thermometer({
    controller: "TMP36",
    pin: "A0"
  });

  temperature.on("data", function() {
    console.log("celsius: %d", this.C);
    console.log("fahrenheit: %d", this.F);
    console.log("kelvin: %d", this.K);
  });
});
