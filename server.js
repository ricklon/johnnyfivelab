var config = require('./config.js');
var express = require('express');
var app = express();
var five = require("johnny-five");
var led;
var temp;
var tempValue;
var btnStatus;
var PIN_LED1 = 1;
var PIN_BTN1 = 16;
var board = new five.Board({port: config.port});var button;

board.on("ready", function() {
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
        tempvalue = value * 330 / 1024);
        console.log(value * 330 / 1024);
    });
    console.log("Board is Ready!");
});


app.get('/', function(req, res) {
    res.send('Devices Connected:');
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
app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
