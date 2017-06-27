
#Project set up

This configures the project from scratch and all examples will start from here.

##Quick Setup (Windows 7)

1. Windows nodejs version 6.x
  * https://nodejs.org/en/download/
1. Installed 6.x MSI version
1. Give permissions as requested
1. Download johnny five lab
  * https://github.com/ricklon/johnnyfivelab
1. Extract lab
  * C:\MASTERs\20003
1. Run Nodejs command prompt
  * ```cd C:\MASTERs\20003\johnnyfivelab-master```
1. Install the node.js dependencies
  * ```npm install```
1. Wait for all files to be doownloaded and installed
1. Install globally the web dependency manager: "bower"
  * ```npm install bower -g```
1. Install Arduino as administrator
  * https://www.arduino.cc/en/Main/Softwarehttps://www.arduino.cc/en/Main/Software
1. Need a local editor in addition to Arduino
  * Local editor needs to handle unix line endings
1. Run Arduino
1. Install chipKIT core
  * http://chipkit.net/wiki/index.php?title=ChipKIT_core
1. Install the stk500v2 drivers from https://github.com/chipKIT32/chipKIT-drivers/releases/download/v1.0/drivers_windows_v1.zip
 * Install as admin
1. Load arduino sketch blink.ino to test Arduino is working
1. Fix serial port driver issues if any are found
1. Upload arduino/standardFirmatachipKITledstrip to Fubarino Mini
2. Select the default serial port for the system:
  * ```node listSerialPorts.js```
1. Run blink.js to test if correct port has been found.
  * ```node blink.js```
  * Should see blinking LED on board
  * Otherwise, edit "config.js" with text editor and put in correct serial port
1. Final test
  * ```node server-io.js```
  * Open Firefox or Chrome with http://localhost:3000
  * You should see the current temperature. Check the on board LED. Check the LED strip animation.

