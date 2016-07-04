var serialport = require('serialport');
var prompt = require('prompt');
var SerialPort = serialport.SerialPort;
var portName;

prompt.start();
// list serial ports:
console.log("Select serial port by typing it's number into the prompt.");
serialport.list(function(err, ports) {
    ports.forEach(function(port, ii) {
        console.log("(%d): %s", ii, port.comName);
    });
    prompt.get(['num'], function(err, result) {
        console.log("Port Selected: %s", ports[result.num].comName);
        portName = ports[result.num].comName;
    });
    //console.log("Port Selected: %s, ", portName);
});
