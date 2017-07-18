const config = require('config');
const logger = require('winston');
const path = require('path');
const extend = require('util')._extend;
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const five = require('johnny-five');

const board = new five.Board(
  // { port: config.get('port'), }
);

const Ledstrip = require('./ledstrip.js');

const ledstrip = new Ledstrip(board);

let button;
let led;
let tempValue;
let curTemp = - 1000;
let tSensor;
let btnStatus;
const PIN_LED1 = 1; // pin board
const PIN_BTN1 = 16; // pin board
const A0 = 0;
const MAX_PIXEL = 30;
let pixelCur = 0;
let LowAlarm;
let highAlarm;
const state = {
  curTemp:  curTemp,
  board: {},
};

board.on('ready', function() {
  ledstrip.hello();
  ledstrip.clear();
  ledstrip.show();
  ledstrip.setPixelColor();
  ledstrip.hello();
  state.board = board.pins;

  led = new five.Led(PIN_LED1);
  button = new five.Button({
    pin: PIN_BTN1,
    invert: true,
  });

  tSensor = new five.Thermometer({
    controller: 'TMP36',
    pin: A0,
    freq: 250,
    aref: 3.3,
  });

  // "down" the button is pressed
  button.on('down', function() {
    btnStatus = 'down';
    led.on();
    ledstrip.setPixelColor(pixelCur += 1, 255, 0, 0);
    ledstrip.show();
    if (pixelCur >= 30) {
      pixelCur = 0;
      ledstrip.clear();
    }
    logger.log('info', 'down');
  });

  // "hold" the button is pressed for specified time.
  button.on('hold', function() {
    btnStatus = 'hold';
    logger.log('info', 'hold');
  });

  // "up" the button is released
  button.on('up', function() {
    btnStatus = 'up';
    logger.log('info', 'up');
  });

  // When the sensor value changes, log the value
  tSensor.on('change', function(value) {
    logger.log('info', `C: ${value.C}, F: ${value.F}`);
    io.emit('sendTemp', {
      curTemp: value.C,
    });
  });
  // emit the init data to client
  io.emit('init', {
    curTemp: curTemp,
    board: board.pins,
  });

  board.on('close', function() {
    logger.log('info', 'BOARD: closed');
  });
  logger.log('info', 'Board is Ready!');
});

// Socket connection handler
// Order matters Init the board and the socket
// The Socket resets and you don't want your board to reset too.
io.on('connection', function(socket) {
  logger.log('info', socket.id);
  // logger.log('info', board);
  socket.emit('init', board.pins);

  socket.on('led:on', function() {
    led.on();
    logger.log('info', 'LED ON RECEIVED');
  });
  socket.on('led:off', function() {
    led.off();
    logger.log('info', 'LED OFF RECEIVED');
  });
  socket.on('ledstrip:clear', function() {
    ledstrip.clear();
    logger.log('info', 'LEDSTRIP CLEAR RECEIVED');
  });
  socket.on('ledstrip:show', function() {
    ledstrip.show();
    logger.log('info', 'LEDSTRIP SHOW RECEIVED');
  });
  socket.on('ledstrip:hello', function() {
    ledstrip.hello();
    logger.log('info', 'LEDSTRIP HELLO RECEIVED');
  });
  socket.on('ledstrip:setpixelcolor', function(data) {
    ledstrip.setPixelColor(data.pixel, data.red, data.green, data.blue);
    logger.log('info', 'LEDSTRIP SETPIXELCOLOR pixel: %d, red: %d, green: %d, blue: %d', data.pixel, data.red, data.green, data.blue);
  });
  socket.on('ledstrip:setframecolor', function(color) {
    for (let pixel = 0; pixel < MAX_PIXEL; pixel += 1) {
      ledstrip.setPixelColor(pixel, color[1], color[2], color[0]);
    }
    ledstrip.show();
  });
  socket.on('ledstrip:setclearshowpixelcolor', function(data) {
    ledstrip.setClearShowPixelColor(data.pixel, data.red, data.green, data.blue);
    logger.log('info', 'LEDSTRIP SETPIXELCOLOR pixel: %d, red: %d, green: %d, blue: %d', data.pixel, data.red, data.green, data.blue);
  });
  // Color array needs to be set
  socket.on('ledstrip:updatepixelframe', function(frame) {
    for (let pixel = 0; pixel < 30; pixel += 1) {
      ledstrip.setPixelColor(pixel, frame[pixel].red, frame[pixel].green, frame[pixel].blue);
    }
    ledstrip.show();
  });
  socket.on('ledstrip:setbrightness', function(data) {
    ledstrip.setBrightness(data);
    logger.log('info', `LEDSTRIP BRIGHTNESS RECEIVED: ${data}`);
  });
  socket.on('temp:setLowAlarm', function(data) {
    LowAlarm = data;
    logger.log('info', 'Low Alarm for Temperature set: %d', data);
  });
  socket.on('temp:setHighAlarm', function(data) {
    highAlarm = data;
    logger.log('info', 'High Alarm for Temperature set: %d', data);
    // socket.emit('highalarmset', 'true');
  });
  socket.on('ledstrip:alertLOW', function() {
    ledstrip.alertLOW();
    //  logger.log('info', 'Alert: Low Alarm');
  });
  socket.on('ledstrip:alertHIGH', function() {
    ledstrip.alertHIGH();
    //  logger.log('info', 'Alert: High Alarm');
  });

  socket.on('disconnect', function() {
    setTimeout(function() {
      logger.log('info', 'Socket.io disconnect');
    }, 10000);
  });
});


app.use(express.static(path.join(__dirname, '/public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.get('/led/on', function(req, res) {
  if (board.isReady) {
    led.on();
    res.send('led on!');
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/led/off', function(req, res) {
  if (board.isReady) {
    led.off();
    res.send('led off!');
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/temp', function(req, res) {
  // let val = 'not ready';
  if (board.isReady) {
    res.send(`Temperature: ${tempValue}`);
  } else {
    res.status(status).send('Board not ready');
  }
});
app.get('/button', function(req, res) {
  if (board.isReady) {
    res.send(`Button: ${btnStatus}`);
  } else {
    res.status(status).send('button not ready');
  }
});
// server.listen(3000, "0.0.0.0", function() {
server.listen(3000, function() {
  logger.log('info', 'Listening on: http://localhost:3000');
});
