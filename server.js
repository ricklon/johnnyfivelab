var express = require('express');
var app = express();

var five = require("johnny-five");
var button;
var led;
var temp;
var tempValue;
var PIN_LED1 = 21; //0
var PIN_BTN1 = 23; //16
var board = new five.Board();

board.on("ready", function() {
  led = new five.Led(PIN_LED1);
  button = new five.Button({
        pin: PIN_BTN1 ,
        invert: true
  });
  // "down" the button is pressed
   button.on("down", function() {
     led.on();
     console.log("down");
   });

   // "hold" the button is pressed for specified time.
   button.on("hold", function() {
     console.log("hold");
   });

   // "up" the button is released
   button.on("up", function() {
     console.log("up");
   });

  temp = new five.Sensor({
    pin: "A0",
      freq: 250,
      threshold: 5
  });
  // When the sensor value changes, log the value
  temp.on("change", function(value) {
    tempvalue = value*(3300/1024);
    console.log(value*(3300/1024));
  });
  console.log("Board is Ready!");
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/led/on', function (req, res) {
   if(board.isReady){
      led.on();
    }
  res.send('led on!');
});
app.get('/led/off', function (req, res) {
  if(board.isReady){
     led.off();
   }
  res.send('led off!');
});
app.get('/temp', function (req, res) {
  var val = "not ready";
   if(board.isReady){
      val = tempvalue;
    }
  //res.status(status).send(body);
  res.send('Temperature:' + val);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
