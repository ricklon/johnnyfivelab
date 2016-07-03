var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var five = require("johnny-five");
var button;
var led;
var temp;
var tempValue;
var btnStatus;
var PIN_LED1 = 21; //0
var PIN_BTN1 = 23; //16
var board = new five.Board();
var Ledstrip = require("./ledstrip.js");
var ledstrip = new Ledstrip(board);


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
        tempvalue = value * (3300 / 1024);
        console.log(value * (3300 / 1024));
    });
    console.log("Board is Ready!");
});

//Socket connection handler
io.on('connection', function(socket) {
    console.log(socket.id);

    socket.on('led:on', function(data) {
        led.on();
        console.log('LED ON RECEIVED');
    });

    socket.on('led:off', function(data) {
        led.off();
        console.log('LED OFF RECEIVED');

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

server.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
