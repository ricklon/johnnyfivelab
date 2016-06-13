#This is the set up for the chipKIT Masters workshop.


##Project set up

This configures the project from scratch and all examples will start from here.

###Setup
```
machine1% mkdir HelloLab
machine1 [mkdir HelloLab] ~/projects/ricklon                                                                                          
machine1% cd HelloLab
machine1 [cd HelloLab] ~/projects/ricklon/HelloLab                                                                                    
machine1% npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

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

```npm install johnny-five```

The followig is the log of what happened.

```
rumakervr% npm install johnny-five --save

> serialport@3.1.2 install /Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport
> node-pre-gyp install --fallback-to-build

[serialport] Success: "/Users/rickanderson/projects/ricklon/HelloLab/node_modules/serialport/build/Release/serialport.node" is installed via remote
hellolab@1.0.0 /Users/rickanderson/projects/ricklon/HelloLab
└── johnny-five@0.9.53  extraneous

npm WARN hellolab@1.0.0 No repository field.
rumakervr [npm install johnny-five] ~/projects/ricklon/HelloLab                                                                                
rumakervr% cat package.json
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

Need to check why Johnny-five is not added to the package.json file.

Examining the dependencies for johnny-five:

```
ls node_modules
ansi-regex              commander               escape-string-regexp    johnny-five             nanotimer               temporal
ansi-styles             debug                   firmata                       object-keys
bindings                define-properties       foreach                 lodash.clonedeep        object.assign
browser-serialport      ease-component          function-bind           lodash.debounce         serialport
chalk                   es6-promise             graceful-readlink       ms                      strip-ansi
color-convert           es6-shim                has-ansi                nan                     supports-color
```

In any case johnny-five is now installed.

###Configure Fubarino Mini

Go to the Arduino IDE with the chipKIT-core installed. Scroll down to the Firmata library examples. Then select and load "StandardFirmataChipKIT" once that is loaded onto the Fubarino Mini we are ready to talk to it via Node.js and Johnny-five.

###Blink Hello
First Fubarino_Mini has the LED on pin 0.
```
var five = require("johnny-five");
var board = new five.Board();


board.on("ready", function() {
  // Create an Led on pin 13
  var led = new five.Led(0);

  // Strobe the pin on/off, defaults to 100ms phases
  led.strobe();
});
```

###Hello Button
The button for the Fubarion_Mini is on pin 16.
```
var five = require("johnny-five"),board,button;
var board = new five.Board();

board.on("ready", function() {
  var ledAnalog = five.Led(1);

  var button = new five.Button({
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

board.on("ready", function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var temp = new five.Sensor({
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


###Connect these to a REST application
Connect the LED, button, and temperature sensor to a CRUD Rest Application.

Create, Read, Update, Delete (CRUD) features.

| Action | URL | HTTP Verb | POST body | Result |
| ------ | ------- | ------ | ----- |  ------ |
| Create /api/parts | POST | JSON String | Create new part |
| Read "Get all"| /api/parts | GET | empty | return all parts |
| Read "Get one"| /api/parts/:id  | GET | empty | get one part |
| Update | /api/parts/:id | PUT | JSON string |Update an existing part |
| Delete | /api/parts/:id | DELETE | empty | delete specific part |


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
  * SD Card
   * Create
   * Read
   * Update
   * Delete  

###Connect to a Web page
