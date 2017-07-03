const config = require('config');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const five = require('johnny-five');

const board = new five.Board({
  port: config.get('port'),
});

const Ledstrip = require('./ledstrip.js');

const ledstrip = new Ledstrip(board);


let button;
let led;


let tempValue;
let tempSensor;
let btnStatus;
const PIN_LED1 = 1; // 0
const PIN_BTN1 = 16; // 16

// let pixels = 30;
let pixelCur = 0;
let LowAlarm;
let highAlarm;

board.on('ready', function () {
    ledstrip.hello();
    ledstrip.clear();
    ledstrip.show();
    ledstrip.setPixelColor();
    ledstrip.hello();

    led = new five.Led(PIN_LED1);
    button = new five.Button({
      pin: PIN_BTN1,
      invert: true,
    });

    tempSensor = new five.Sensor({
      pin: 'A0',
      freq: 250,
      threshold: 5,
    });
    tempSensor.on('data', function () {
      tempValue = this.value;
    });
    // "down" the button is pressed
    button.on('down', function () {
      btnStatus = 'down';
      led.on();
      ledstrip.setPixelColor(pixelCur += 1, 255, 0, 0);
      ledstrip.show();
      if (pixelCur >= 30) {
        pixelCur = 0;
        ledstrip.clear();
      }
      console.log('down');
    });

    // "hold" the button is pressed for specified time.
    button.on('hold', function () {
      btnStatus = 'hold';
      console.log('hold');
    });

    // "up" the button is released
    button.on('up', function () {
      btnStatus = 'up';
      console.log('up');
    });


    board.on('close', function () {
      console.log('BOARD: closed');
    });
    console.log('Board is Ready!');
});

    // Socket connection handler
    // Order matters Init the board and the socket
    // The Socket resets and you don't want your board to reset too.
    io.on('connection', function (socket) {

    console.log(socket.id);
    socket.on('led:on', function (data) {
      led.on();
      console.log('LED ON RECEIVED');
    });
    socket.on('led:off', function (data) {
      led.off();
      console.log('LED OFF RECEIVED');
    });
    socket.on('ledstrip:clear', function (data) {
      ledstrip.clear();
      console.log('LEDSTRIP CLEAR RECEIVED');
    });
    socket.on('ledstrip:show', function (data) {
      ledstrip.show();
      console.log('LEDSTRIP SHOW RECEIVED');
    });
    socket.on('ledstrip:hello', function (data) {
      ledstrip.hello();
      console.log('LEDSTRIP HELLO RECEIVED');
    });
    socket.on('ledstrip:setpixelcolor', function (data) {
      ledstrip.setPixelColor(data.pixel, data.red, data.green, data.blue);
      console.log('LEDSTRIP SETPIXELCOLOR pixel: %d, red: %d, green: %d, blue: %d', data.pixel, data.red, data.green, data.blue);
    });
    socket.on('ledstrip:setclearshowpixelcolor', function (data) {
      ledstrip.setClearShowPixelColor(data.pixel, data.red, data.green, data.blue);
      console.log('LEDSTRIP SETPIXELCOLOR pixel: %d, red: %d, green: %d, blue: %d', data.pixel, data.red, data.green, data.blue);
    });
    socket.on('ledstrip:setbrightness', function (data) {
      ledstrip.setBrightness(data);
      console.log(`LEDSTRIP BRIGHTNESS RECEIVED: ${data}`);
    });
    socket.on('temp:setLowAlarm', function (data) {
      LowAlarm = data;
      console.log('Low Alarm for Temperature set: %d', data);
    });
    socket.on('temp:setHighAlarm', function (data) {
      highAlarm = data;
      console.log('High Alarm for Temperature set: %d', data);
      // socket.emit('highalarmset', 'true');
    });
    socket.on('ledstrip:alertLOW', function () {
      ledstrip.alertLOW();
    //  console.log('Alert: Low Alarm');
    });
    socket.on('ledstrip:alertHIGH', function () {
      ledstrip.alertHIGH();
    //  console.log('Alert: High Alarm');
    });
/*
    // When the sensor value changes, log the value
    tempSensor.on('change', function (value) {
      let tempVoltage = value * (3300 / 1024);
      let celsiusValue = (tempVoltage - 500) / 10;
      let farenValue = (celsiusValue * (9 / 5)) + 32;
      console.log(`Analog: ${value} , C: ${celsiusValue.toPrecision(3)}, F: ${farenValue}`);
      socket.emit('sendTemp', {
        curTemp: farenValue,
      });
    });


    socket.emit('init', {
      curTemp: (((tempValue * (3300 / 1024)) - 500) / 10),
      board: board.io,
    });

    */

    socket.on('disconnect', function () {
      setTimeout(function () {
        console.log('Socket.io disconnect');
      }, 10000);
    });
  });



app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/led/on', function (req, res) {
  if (board.isReady) {
    led.on();
    res.send('led on!');
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/led/off', function (req, res) {
  if (board.isReady) {
    led.off();
    res.send('led off!');
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/temp', function (req, res) {
  // let val = 'not ready';
  if (board.isReady) {
    res.send(`Temperature: ${tempValue}`);
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/button', function (req, res) {
  if (board.isReady) {
    res.send(`Button: ${btnStatus}`);
  } else {
    res.status(status).send('button not ready');
  }
});

// server.listen(3000, "0.0.0.0", function() {
server.listen(3000, function () {
  console.log('Listening on: http://localhost:3000');
});
