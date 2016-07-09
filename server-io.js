var config = require('./config.js');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var five = require("johnny-five");
var board = new five.Board({port: config.port});var button;
var led;
var temp;
var tempValue;
var btnStatus;
var PIN_LED1 = 1; //0
var PIN_BTN1 = 16; //16
var Ledstrip = require("./ledstrip.js");
var ledstrip = new Ledstrip(board);
var pixels = 30;
var pixel_cur = 0;
var LowAlarm;

//Socket connection handler
io.on('connection', function(socket) {
  console.log(socket.id);

  board.on("ready", function() {
    ledstrip.hello();
    ledstrip.clear();
    ledstrip.show();
    ledstrip.setPixelColor();
    ledstrip.hello();

    led = new five.Led(PIN_LED1);
    button = new five.Button({
      pin: PIN_BTN1,
      invert: true
    });
    // "down" the button is pressed
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

    // "hold" the button is pressed for specified time.
    button.on("hold", function() {
      btnStatus = "hold";
      console.log("hold");
    });

    // "up" the button is released
    button.on("up", function() {
      btnStatus = "up";
      console.log("up");
    });

    temp = new five.Sensor({
      pin: "A0",
      freq: 250,
      threshold: 5
    });
    // When the sensor value changes, log the value
    temp.on("change", function(value) {
      tempvalue = value * 330 / 1024;
      console.log(tempValue);
      socket.emit('emitting', {curTemp: tempValue});
    });

    console.log("Board is Ready!");


    socket.on('led:on', function(data) {
      led.on();
      console.log('LED ON RECEIVED');
    });
    socket.on('led:off', function(data) {
      led.off();
      console.log('LED OFF RECEIVED');

    });
    socket.on('ledstrip:clear', function(data) {
      ledstrip.clear();
      console.log('LEDSTRIP CLEAR RECEIVED');

    });
    socket.on('ledstrip:show', function(data) {
      ledstrip.show();
      console.log('LEDSTRIP SHOW RECEIVED');

    });
    socket.on('ledstrip:hello', function(data) {
      ledstrip.hello();
      console.log('LEDSTRIP HELLO RECEIVED');

    });
    socket.on('ledstrip:setpixelcolor', function(data) {
      ledstrip.setPixelColor(data.pixel, data.red, data.green, data.blue);
      console.log('LEDSTRIP SETPIXELCOLOR pixel: %d, red: %d, green: %d, blue: %d', data.pixel, data.red, data.green, data.blue);
    });
    socket.on('temp:setLowAlarm', function(data) {
      LowAlarm = data;
      console.log('Low Alarm for Temperature set: %d', data);
      //socket.emit('lowalarmset', 'true');
    });
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


app.get('/led/on', function(req, res) {
  if (board.isReady) {
    led.on();
    res.send('led on!');
  } else {
    res.status(status).send("Board not ready");
  }

});
app.get('/led/off', function(req, res) {
  if (board.isReady) {
    led.off();
    res.send('led off!');
  } else {
    res.status(status).send("Board not ready");
  }

});
app.get('/temp', function(req, res) {
  var val = "not ready";
  if (board.isReady) {
    val = tempvalue;
    //res.status(status).send(body);
    res.send('Temperature:' + val);
  } else {
    res.status(status).send("Board not ready");
  }

});
app.get('/button', function(req, res) {

  if (board.isReady) {
    res.send('Button:' + btnStatus);
  } else {
    res.status(status).send("button not ready");
  }
});

//server.listen(3000, "0.0.0.0", function() {
server.listen(3000, function() {
  console.log('Listening on: http://localhost:3000');
});
