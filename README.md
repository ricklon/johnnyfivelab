#This is the set up for the chipKIT Masters workshop.

##Setup instructions
* [Quick Setup](../master/setup.md)

##Presentation
##Lab Manual

###Blink Hello
First Fubarino_Mini has the LED on pin 0.
```
var five = require("johnny-five");
var board = new five.Board();
var led;

board.on("ready", function() {
  // Create an Led on pin 13
  led = new five.Led(0);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
```

###Hello Button
The button for the Fubarion_Mini is on pin 16.
```
var five = require("johnny-five"),board;
var button;
var board = new five.Board();

board.on("ready", function() {
  var ledAnalog = five.Led(1);

  button = new five.Button({
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

```

###HelloPotentiometer
We'll put this one on A)
```
var five = require("johnny-five"),
var board = new five.Board();

board.on("ready", function() {
  // Assuming a sensor is attached to pin "A1"
  this.pinMode(A0, five.Pin.ANALOG);
  this.analogRead(A0, function(value) {
    console.log(value);
  });
});

```

###HelloTemperature
We'll read temperature from A0 as well
```
var five = require("johnny-five");
var board = new five.Board();
var temp;
board.on("ready", function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  temp = new five.Sensor({
            pin: "A0",
        freq: 250,
        threshold: 5
  });

  // When the sensor value changes, log the value
  temp.on("change", function(value) {
    console.log(value*330/1024);
  });
});
```

###Exploring the REPL: Command line for Johnny-five
Read, Evaluate, Print Loop (REPL)
This is a command line interface to the objects created using Johnny-five.
```
>>>led.on()
>>>led.off()
```


###Connect Johnny-five devices to a RESTful application
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
