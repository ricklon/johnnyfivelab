var config = require('config');
var five = require("johnny-five");
var board = new five.Board({port: config.get('port')});


board.on("ready", function() {

  // Create a new generic  temperature sensor instance for
  // a sensor connected to an analog (ADC) pin
  var temp = new five.Sensor({
	    pin: "A0", //sensor supports the analog naming scheme
        freq: 250,
        threshold: 5
  });

  // When the sensor value changes, log the value
  temp.on("change", function(value) {
    console.log(value*330/1024);
  });
});
