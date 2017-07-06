# 20009 Advanced Arduino Masters workshop.

## TODO
[x] Freshen node version and module dependencies
[] What changed since last year

##Setup instructions
* [Quick Setup](../master/setup.md)

## Upload code to Fubarino_Mini

Use Arduino and chipKIT-core 1.4.1

Check if PlatformIO has updated the to chipKIT-core 1.4.1
```
pio run -e fubarino_mini -t  upload

```

## Presentation
* [Power Point Presentation](https://microchip.box.com/s/3vcrrs3idecakx68nn6wtq8sw1tfbi4m)

##Lab Manual
* [Lab Manual](../master/labmanual.md)


### Blink Hello
First Fubarino_Mini has the LED on pin 0.
```
const config = require('config');
const five = require('johnny-five');

const board = new five.Board({ port: config.get('port') });
const PIN_LED1 = 1; // Fubarino_mini pin 1

board.on('ready', function() {
  // Create an Led on LED_PIN
  const led = new five.Led(PIN_LED1);
  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
```

### Hello Button
The button for the Fubarion_Mini is on pin 16.
```
const config = require('config');
const logger = require('winston');
const five = require('johnny-five');
const board = new five.Board({
  port: config.get('port'),
});
const PIN_BTN1 = 16;

board.on('ready', function() {
  const button = new five.Button({
    pin: PIN_BTN1,
    invert: true,
  });
  // Make button accessible from the command line
  board.repl.inject({ button, button });
  // 'down' event the button is pressed
  button.on('down', function() {
    logger.log('info', 'down');
  });
  // 'hold' event the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  button.on('hold', function() {
    logger.log('info', 'hold');
  });
  // 'up' event the button is released
  button.on('up', function() {
    logger.log('info', 'up');
  });
});

```

### HelloPotentiometer
We'll put this one on A2, pin 4
```
const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const A2 = 4;
const board = new five.Board();
let potentiometer;

board.on('ready', function() {
  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: A2,
    freq: 250,
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer,
  });

  // 'data' get the current reading from the potentiometer
  potentiometer.on('data', function() {
    logger.log('info', `${this.value}, ${this.raw}`);
  });
});

```

### HelloTemperature
We'll read temperature from A0 as well
```
const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const A0 = 0;
const board = new five.Board({
  port: config.get('port'),
});
let tSensor;

board.on('ready', function() {
  tSensor = new five.Thermometer({
    controller: 'TMP36',
    pin: A0,
    freq: 250,
    aref: 3.3,
  });

  tSensor.on('data', function() {
    logger.log('info', 'celsius: %d', this.C);
    logger.log('info', 'fahrenheit: %d', this.F);
    logger.log('info', 'kelvin: %d', this.K);
  });

  board.repl.inject({
    tmp36: tSensor,
  });
});
```

### Exploring the REPL: Command line for Johnny-five
Read, Evaluate, Print Loop (REPL)
This is a command line interface to the objects created using Johnny-five.
```
>>>led.on()
>>>led.off()
```


### Connect Johnny-five devices to a RESTful application
Connect the LED, button, and temperature sensor to a CRUD Rest Application.

What is a RESTful application?
TODO: Answer:

Create, Read, Update, Delete (CRUD) features mapped to the HTTP protocol.

| Action    | URL | HTTP Verb | POST body | Result |
| -------------------- | ------- | ------ | ----- |  ------ |
| Create /api/devices | POST | JSON String | Create new part |
| Read "Get all"| /api/devices | GET | empty | return all devices |
| Read "Get one"| /api/devices/:id  | GET | empty | get one part |
| Update | /api/devices/:id | PUT | JSON string |Update an existing part |
| Delete | /api/devices/:id | DELETE | empty | delete specific part |


What does this mean for:
INPUTS
* button
 * Create
 * Read
* temperature sensor
 * Create
 * Read

OUTPUTS
* led
  * Create
  * Update
* led strip
 * Create
 * Update

INPUT/OUTPUT
  * SD Card (SPI, I2C, Serial)
   * Create
   * Read
   * Update
   * Delete  

###Create a RESTful mapping for LED, button, temperature sensor

LED

Action    | URL | HTTP Verb | POST body | Result |
| -------------------- | ------- | ------ | ----- |  ------ |
| Create | /dev/led | POST | JSON String |  Turn led on with a pattern/command |
| Read "Get all"| /dev/led | GET | empty | get status |
| Read "Get one"| /dev/led/:id  | GET | empty | get status |
| Update | /dev/led/:id | PUT | JSON string |Update parameters and values for command |
| Delete | /dev/led/:id | DELETE | empty | turn off led |

The commands correspond to the johnny-five LED object library methods:
LED API parameters
http://johnny-five.io/api/led/
* on
* off
* toggle
* blink
* strobe
* brightness
* fade
* stop
* pulse
* fadeIn
* fadeOut


Groups of leds
http://johnny-five.io/api/leds/



###Connect to a Web Server and Page using Express

For this lab all of the steps above will be completed and we'll just examine the server and part relationship with a complete example.

Node.js tools:
* express
* body-parser
* ejs
* johnny-five

```npm install express body-parser ejs johnny-five --save```

Examples:
* Review the issue of scope for combining two kinds of programs.
```
var express = require('express');
var app = express();

var five = require("johnny-five");
var button;
var led;
var temp;
var tempValue;
var btnStatus;
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
    tempvalue = value*330/1024);
    console.log(value*330/1024);
  });
  console.log("Board is Ready!");
});

//Express section
app.get('/', function (req, res) {
  res.send('Devices Connected:');
});

//app.route('/').get(callback).post(toggle)

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
app.get('/button', function (req, res) {

   if(board.isReady){
     res.send('Button:' + btnStatus);
   } else {
     res.status(status).send("button not ready");
   }
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

```
