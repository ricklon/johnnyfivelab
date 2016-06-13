#This is the set up for the chipKIT Masters workshop.


##Project set up

This configures the project from scratch and all examples will start from here.

###Useful command line commands:
* mkdir
* pwd
* npm
* node
* cd
*  

###Setup

Let's set up the basic project we'll use for the workshop.

```
$ mkdir HelloLab
$ [mkdir HelloLab] ~/projects/ricklon                                                                                          
$ cd HelloLab
$[cd HelloLab] ~/projects/ricklon/HelloLab                                                                                    
$ npm init
```
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

```
Press ^C at any time to quit.
name: (HelloLab)
Sorry, name can no longer contain capital letters.
name: (HelloLab) hellolab
version: (1.0.0)
description: Hello World for chipKIT, Node.js with Johny-Five
entry point: (index.js) blink.js
test command: node blnk.js
git repository:
keywords:
author: Rick Anderson
license: (ISC) Apache 2.0
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "Apache-2.0".
license: (ISC) apache2.0
Sorry, license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>" and license is similar to the valid expression "Apache-2.0".
license: (ISC) Apache-2.0
About to write to /Users/rickanderson/projects/ricklon/HelloLab/package.json:
```
It then creates a package.json file that describes the project and keeps track of the modules you use in your project.

```
{
  "name": "hellolab",
  "version": "1.0.0",
  "description": "Hello World for chipKIT, Node.js with Johny-Five",
  "main": "blink.js",
  "scripts": {
    "test": "node blnk.js"
  },
  "author": "Rick Anderson",
  "license": "Apache-2.0"
}


Is this ok? (yes)
machine1 [npm init] ~/projects/ricklon/HelloLab   
```

This set's up the basic node.js work area. I've added the readme.md as the second step. This provides the instructions on how to get started and the step by step guide to get going.

###Install packages
Packages are libraries that are available to any node.js application. It makes sharing code, dependencies, libraries, and keeping track of versions of libraries automatic.

npm install package_name --save //installs packages
npm remove package_name //removes the packages
npm update // upgrades the packages

For this project we'll have most everything already in the project folder. But here's how you install what we need to get started with.

```npm install johnny-five --save```

The following is the log of what happened. The  johnny-five module is download and the dependencies  are created. The flag "--save" saves the module johnny-five into the package.json file.

```
$ npm install johnny-five --save

> serialport@3.1.2 install /Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport
> node-pre-gyp install --fallback-to-build

[serialport] Success: "/Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport/build/Release/serialport.node" is installed via remote
hellolab@1.0.0 /Users/rickanderson/projects/ricklon/HelloLab
└── johnny-five@0.9.53  extraneous

npm WARN hellolab@1.0.0 No repository field.
$ [npm install johnny-five] ~/projects/ricklon/HelloLab                                                                                
$ cat package.json
{
  "name": "hellolab",
  "version": "1.0.0",
  "description": "Hello World for chipKIT, Node.js with Johny-Five",
  "main": "blink.js",
  "scripts": {
    "test": "node blnk.js"
  },
  "author": "Rick Anderson",
  "license": "Apache-2.0",
  "dependencies": {
    "johnny-five": "^0.9.53"
  }
}
```

johnny-five is now installed.

###Configure Fubarino Mini

Go to the Arduino IDE with the chipKIT-core installed. Scroll down to the Firmata library examples. Then select and load "StandardFirmataChipKIT" once that is loaded onto the Fubarino Mini we are ready to talk to it via Node.js and Johnny-five.

Important note about scope. The "var" declares where a variables scope starts. More explanation here.

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
    console.log(value*3300/1024);
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
| Create /dev/led | POST | JSON String | | Turn led on with a pattern/command |
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
    tempvalue = value*(3300/1024);
    console.log(value*(3300/1024));
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
