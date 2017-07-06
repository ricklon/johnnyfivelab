# For the . Johnny-Five Workshop Quick Guide from C/C++ to Node.js, Javascript ES6


## First thing and example all in one

Javascript is asynchronous. It will run through your code top to bottom and execute in order. If any events are referenced the will be executed and not waited for. Here's an example with

```javascript
const config = require('config');
const logger = require('winston');
const five = require('johnny-five');

const board = new five.Board({
  //port: config.get('port'),
});
const PIN_LED1 = 1; // Fubarino_mini pin 1

logger.log('info', 'johhnyfive: start');

board.on('ready', function() {
  //Create an Led on LED_PIN
  const led = new five.Led(PIN_LED1);
  led.strobe();
});
board.on('close', function() {
  logger.log('info', 'Board closed')
});
logger.log('info', 'johhnyfive: end');

```

The output from this command shows the start and stop code. Then when happens in the `board.on()` section runs indefinitely.

```
rk2$ node helloboard.js
info: johhnyfive: start
info: johhnyfive: end
1499356787625 Available /dev/cu.usbmodem431
1499356787632 Connected /dev/cu.usbmodem431
1499356792642 Repl Initialized
>>
(To exit, press ^C again or type .exit)
>>
info: Board exit
1499356799658 Board Closing.
```

## Variable declarations:

### Constants:
```Javascript
const BTN_PIN = 16; // It's a constant
const PIN_LED1 = 1; // Value assigned at declaration
```

Object values can be assign to constants. The values contained in the object can be changed but the variable name cannot be reassigned to a new object.


```Javascript
const led =   const led = new five.Led(PIN_LED1);

```

```Javascript
led = new five.Led(20); // invalid
led = new five.button(2); // invalid
```

### Non constant declarations:

Javsascript is runtime and not strongly typed. So variables we create start out as just a name and in order to have the same scope as we expect in C/C++ declare with the "let" expression.

No types required. Type upon assignment.

```Javascript
let sensorValue; // declaration without type is normal
```

### Functions

Using Javascript functions look and feel just like c/c++ functions. Except loosely type including return types.

Function usage:

```Javascript
const setFrameColor = function(color) {
  for (let pixel = 0; pixel < MAX_PIXEL; pixel += 1) {
    ledstrip.setPixelColor(pixel, color[1], color[2], color[0]);
  }
  ledstrip.show();
}

```

Usage:

```javascript

setFrameColor(colorFrameArray);

```

Special function the anonymous function:

```Javascript
function (data) {

}
```

#### Event Functions

These are triggers or similar to interrupts. As events they can always happen asynchronously.

```
board.reay()

board.on()

button.on()
```
